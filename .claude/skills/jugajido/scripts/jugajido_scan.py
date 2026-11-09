#!/usr/bin/env python3
"""주가지도 자동 판독 스캐너 (Twelve Data).

QQQ(나스닥100 추종 ETF)의 30분봉·일봉을 받아 주가지도 규칙으로 상태를 계산하고,
알림이 필요한 신호를 출력한다. NDX 지수는 무료 플랜에서 막혀 있으므로 QQQ 값에
--ratio(기본 41.7)를 곱해 나스닥100 환산값을 함께 보여준다 (근사치).

API 키는 환경의 네트워크 프록시가 api.twelvedata.com 요청에 자동으로 넣는다.
키를 직접 쓰려면 환경변수 TWELVEDATA_API_KEY 를 설정한다 (헤더로 전송).

사용:
  python3 jugajido_scan.py                 # 사람이 읽는 요약
  python3 jugajido_scan.py --json          # 기계용 JSON
  python3 jugajido_scan.py --state FILE    # 이전 상태와 비교해 '새로 생긴' 신호만 ALERT 표시
"""
import argparse
import json
import os
import sys
import urllib.parse
import urllib.request

API = "https://api.twelvedata.com/time_series"
MA_PERIODS = (5, 20, 60, 120, 240)


def fetch(symbol, interval, size):
    q = urllib.parse.urlencode({"symbol": symbol, "interval": interval, "outputsize": size})
    req = urllib.request.Request(f"{API}?{q}")
    key = os.environ.get("TWELVEDATA_API_KEY")
    if key:
        req.add_header("Authorization", f"apikey {key}")
    with urllib.request.urlopen(req, timeout=30) as r:
        data = json.loads(r.read())
    if data.get("status") != "ok":
        raise RuntimeError(f"{symbol} {interval}: {data.get('message', data)}")
    rows = list(reversed(data["values"]))  # 오래된 것 → 최신
    return [
        {
            "t": v["datetime"],
            "o": float(v["open"]),
            "h": float(v["high"]),
            "l": float(v["low"]),
            "c": float(v["close"]),
        }
        for v in rows
    ]


def sma(xs, n, i):
    if i + 1 < n:
        return None
    return sum(xs[i + 1 - n : i + 1]) / n


def ma_series(closes, n):
    return [sma(closes, n, i) for i in range(len(closes))]


def bollinger(closes, n=20, k=2.0):
    out = []
    for i in range(len(closes)):
        if i + 1 < n:
            out.append(None)
            continue
        w = closes[i + 1 - n : i + 1]
        m = sum(w) / n
        sd = (sum((x - m) ** 2 for x in w) / n) ** 0.5
        out.append((m - k * sd, m, m + k * sd))
    return out


def last_cross(a, b):
    """a가 b를 마지막으로 교차한 (인덱스, 'GC'|'DC')."""
    for i in range(len(a) - 1, 0, -1):
        if None in (a[i], b[i], a[i - 1], b[i - 1]):
            break
        prev, cur = a[i - 1] - b[i - 1], a[i] - b[i]
        if prev <= 0 < cur:
            return i, "GC"
        if prev >= 0 > cur:
            return i, "DC"
    return None, None


def wave_count(ma5, ma20):
    """5파동 법칙: 5선이 20선을 골든크로스한 뒤 데드크로스 없이 몇 번째 파동인지.
    상승 구간과 눌림 구간을 번갈아 1,2,3,... 으로 센다. 데드크로스 상태면 0."""
    idx, kind = last_cross(ma5, ma20)
    if kind != "GC":
        return 0
    waves, rising = 1, True
    for i in range(idx + 1, len(ma5)):
        if ma5[i] is None or ma5[i - 1] is None:
            continue
        up = ma5[i] >= ma5[i - 1]
        if up != rising:
            waves += 1
            rising = up
    return waves


def is_bull_reversal(bars):
    """상승반전 캔들: 음봉 → 도지(+) 또는 작은 봉 → 양봉(직전 음봉 몸통 절반 이상 회복)."""
    if len(bars) < 3:
        return False
    a, b, c = bars[-3], bars[-2], bars[-1]
    a_body = a["o"] - a["c"]
    if a_body <= 0 or c["c"] <= c["o"]:
        return False
    b_range = max(b["h"] - b["l"], 1e-9)
    small = abs(b["c"] - b["o"]) <= 0.35 * b_range or abs(b["c"] - b["o"]) <= 0.5 * a_body
    return small and c["c"] >= a["c"] + 0.5 * a_body


def ma_bottoms(ma, start, end, min_gap=4):
    """ma[start:end] 구간에서 이평선이 만든 바닥(국소 최저점) 인덱스 목록."""
    out = []
    for i in range(max(start, 1), min(end, len(ma) - 1)):
        if None in (ma[i - 1], ma[i], ma[i + 1]):
            continue
        if ma[i] < ma[i - 1] and ma[i] <= ma[i + 1]:
            if not out or i - out[-1] >= min_gap:
                out.append(i)
    return out


def settle_on_60(bars, ma20, ma60, lookback=12):
    """사용자 규칙 '30분봉 60선 안착':
    1) 20선이 두 개의 바닥을 그린 뒤
    2) 캔들이 60선을 강하게 뚫고 올라가고(60선 아래에서 시작해 위에서 마감하는 큰 양봉)
    3) 다음 캔들이 급락하듯 내려오지만 결국 60선 위에서 마감 → 안착
    4) 이후 캔들이 앞고점(돌파·안착 캔들의 고가)을 넘으면 → 일봉상 의미 있는 상승 확인
    최근 lookback 봉 안에서 가장 최근 사례를 돌려준다."""
    n = len(bars)
    bodies = [abs(b["c"] - b["o"]) for b in bars]
    for b in range(n - 2, max(n - 2 - lookback, 21), -1):
        bk, nx = bars[b], bars[b + 1]
        if None in (ma60[b], ma60[b - 1], ma60[b + 1]):
            continue
        avg_body = sum(bodies[b - 20 : b]) / 20
        breakout = (
            bk["c"] > bk["o"]
            and bk["c"] > ma60[b]
            and (bk["o"] <= ma60[b] or bars[b - 1]["c"] <= ma60[b - 1])
            and bodies[b] >= max(avg_body, 1e-9)
        )
        if not breakout:
            continue
        pulled_back = nx["c"] < nx["o"] or nx["l"] < bk["c"]
        settled = pulled_back and nx["c"] > ma60[b + 1]
        if not settled:
            continue
        bottoms = ma_bottoms(ma20, b - 60, b + 1)
        prior_high = max(bk["h"], nx["h"])
        confirmed = any(x["c"] > prior_high for x in bars[b + 2 :])
        return {
            "breakout_time": bk["t"],
            "settle_time": nx["t"],
            "ma60": round(ma60[b + 1], 2),
            "prior_high": prior_high,
            "ma20_two_bottoms": len(bottoms) >= 2,
            "confirmed_breakout": confirmed,
        }
    return None


def analyze(bars):
    closes = [b["c"] for b in bars]
    mas = {n: ma_series(closes, n) for n in MA_PERIODS}
    bb = bollinger(closes)
    i = len(bars) - 1
    cur = {n: mas[n][i] for n in MA_PERIODS}
    price = closes[i]

    avail = [n for n in MA_PERIODS if cur[n] is not None]
    order = sorted(avail, key=lambda n: cur[n], reverse=True)  # 위 → 아래
    big_first = sorted(avail, reverse=True)
    small_first = sorted(avail)
    inverse_pyramid = len(avail) >= 4 and order == big_first and price < cur[small_first[0]]
    pyramid = len(avail) >= 4 and order == small_first and price > cur[small_first[0]]

    widths = [(x[2] - x[0]) / x[1] for x in bb[-60:] if x]
    squeeze = bool(widths) and widths[-1] <= min(widths) * 1.1

    # 쌍바닥: 최근 10봉 저점이 10~60봉 전 저점과 0.6% 이내이고,
    # 두 저점 사이에 1% 이상 반등(가운데 봉우리)이 있어야 한다.
    lows = [b["l"] for b in bars]
    highs = [b["h"] for b in bars]
    n = len(lows)
    r_idx = min(range(n - 10, n), key=lambda k: lows[k])
    recent_low = lows[r_idx]
    start = max(0, n - 60)
    p_range = range(start, n - 10)
    p_idx = min(p_range, key=lambda k: lows[k]) if len(p_range) else None
    prior_low = lows[p_idx] if p_idx is not None else None
    double_bottom = False
    if prior_low is not None and abs(recent_low - prior_low) / prior_low <= 0.006:
        middle_high = max(highs[p_idx:r_idx + 1])
        double_bottom = middle_high >= prior_low * 1.01 and price > recent_low

    gc_idx, gc_kind = last_cross(mas[20], mas[60])
    return {
        "time": bars[i]["t"],
        "price": price,
        "ma": {str(n): (round(v, 2) if v is not None else None) for n, v in cur.items()},
        "order_top_down": order,
        "inverse_pyramid": inverse_pyramid,
        "pyramid": pyramid,
        "above_240": cur[240] is not None and price > cur[240],
        "bb": [round(x, 2) for x in bb[i]] if bb[i] else None,
        "bb_squeeze": squeeze,
        "bull_reversal_candle": is_bull_reversal(bars),
        "double_bottom": double_bottom,
        "recent_low": recent_low,
        "prior_low": prior_low,
        "cross_20_60": gc_kind,
        "cross_20_60_bars_ago": (i - gc_idx) if gc_idx is not None else None,
        "wave_5_over_20": wave_count(mas[5], mas[20]),
        "settle_60": settle_on_60(bars, mas[20], mas[60]),
    }


def signals(tf, a):
    s = []
    if a["inverse_pyramid"]:
        s.append(f"{tf}: 역피라미드(최저점권) 진행")
    if a["pyramid"]:
        s.append(f"{tf}: 정배열 피라미드")
    if a["bull_reversal_candle"]:
        s.append(f"{tf}: 상승반전 캔들(음봉→도지/소봉→양봉)")
    if a["double_bottom"]:
        s.append(f"{tf}: 전저점 부근 쌍바닥 시도")
    if a["bb_squeeze"]:
        s.append(f"{tf}: 볼린저 수축(방향 결정 임박)")
    if a["cross_20_60"] and a["cross_20_60_bars_ago"] is not None and a["cross_20_60_bars_ago"] <= 2:
        s.append(f"{tf}: 20/60 {a['cross_20_60']} 발생")
    if a["wave_5_over_20"] >= 5:
        # 파동 수가 바뀔 때마다 새 알림이 뜨지 않도록 신호 문구는 고정한다 (숫자는 요약 출력에 표시).
        s.append(f"{tf}: 5선 5파 이상(매도 준비)")
    st = a.get("settle_60")
    if st:
        tag = f"{st['breakout_time'][5:16]} 돌파"
        twob = "20선 쌍바닥 후 " if st["ma20_two_bottoms"] else ""
        s.append(f"{tf}: ★ {twob}60선 안착({tag}, 60선 {st['ma60']}, 앞고점 {st['prior_high']:.2f})")
        if st["confirmed_breakout"]:
            s.append(f"{tf}: ★★ 60선 안착 후 앞고점 {st['prior_high']:.2f} 돌파({tag}) = 일봉상 의미 있는 상승")
    s.append(f"{tf}: 240선 {'위' if a['above_240'] else '아래'}")
    return s


def fmt(tf, a, ratio):
    ma = a["ma"]
    nd = lambda v: f"{v:,.2f} (≈NDX {v * ratio:,.0f})" if v is not None else "-"
    lines = [f"[{tf}] {a['time']}  종가 {nd(a['price'])}"]
    for n in MA_PERIODS:
        lines.append(f"  MA{n:<3} {nd(ma[str(n)])}")
    lines.append(f"  배열(위→아래): {' > '.join(map(str, a['order_top_down']))}")
    lines.append(f"  5선 파동(20선 기준): {a['wave_5_over_20']}  /  20·60 최근 교차: {a['cross_20_60']} ({a['cross_20_60_bars_ago']}봉 전)")
    if a["bb"]:
        lines.append(f"  볼린저: {nd(a['bb'][0])} ~ {nd(a['bb'][2])}")
    lines.append(f"  최근 저점 {nd(a['recent_low'])} / 이전 저점 {nd(a['prior_low'])}")
    return "\n".join(lines)


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--symbol", default="QQQ")
    p.add_argument("--ratio", type=float, default=41.7, help="NDX ≈ QQQ × ratio (근사)")
    p.add_argument("--json", action="store_true")
    p.add_argument("--state", help="이전 신호를 저장/비교할 JSON 파일")
    args = p.parse_args()

    result = {}
    for tf, interval, size in (("30분봉", "30min", 400), ("일봉", "1day", 300)):
        a = analyze(fetch(args.symbol, interval, size))
        result[tf] = {"analysis": a, "signals": signals(tf, a)}

    all_sigs = [x for tf in result for x in result[tf]["signals"]]
    new_sigs = all_sigs
    if args.state:
        old = []
        if os.path.exists(args.state):
            with open(args.state, encoding="utf-8") as f:
                old = json.load(f).get("signals", [])
        new_sigs = [x for x in all_sigs if x not in old]
        with open(args.state, "w", encoding="utf-8") as f:
            json.dump({"signals": all_sigs}, f, ensure_ascii=False)

    if args.json:
        print(json.dumps({"result": result, "new_signals": new_sigs}, ensure_ascii=False, indent=1))
        return
    print(f"주가지도 스캔 — {args.symbol} (NDX 환산 ×{args.ratio}, 근사치)\n")
    for tf in result:
        print(fmt(tf, result[tf]["analysis"], args.ratio))
        print()
    print("신호:")
    for x in all_sigs:
        print(f"  {'ALERT ' if x in new_sigs and args.state else '- '}{x}")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:  # noqa: BLE001
        print(f"ERROR: {e}", file=sys.stderr)
        sys.exit(1)
