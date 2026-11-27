#!/usr/bin/env python3
"""위험·펀더멘털 지표의 월봉·주봉·일봉 이평선 기울기와 변동성을 매일 본다 (사용자 요청 2026-11-27).

사용자 해석 규칙 (2026-11-27):
  - 방향 지표: VIXM(VIX 중기선물 ETF) — 올라가면 나쁘다(변동성 확대 = 시장 급등락).
               HYG(하이일드 회사채 ETF) — 위험자산 지표. 해석은 SKILL.md 4-3-1 참고.
  - 안정 지표: USO(WTI 원유), UUP(달러 인덱스 ETF) — 펀더멘털이라 '적정선 유지'가 중요하다.
               방향보다 변동성이 커지는 것(급등·급락)이 나쁘다.

사용:
  python3 macro_trend.py                 # 기본 4종
  python3 macro_trend.py --symbols VIXM HYG
  python3 macro_trend.py --state .macro_state.json   # 기울기·변동성 상태가 바뀐 것만 CHANGE 로 표시
Twelve Data 무료 한도(분당 8회) 때문에 요청 사이에 쉰다.
"""
import argparse
import json
import math
import os
import statistics
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from jugajido_scan import fetch, ma_series  # noqa: E402

TFS = (("월봉", "1month", 200), ("주봉", "1week", 300), ("일봉", "1day", 300))
KIND = {"VIXM": "direction", "HYG": "direction", "USO": "stability", "UUP": "stability"}
LABEL = {"VIXM": "VIX 변동성", "HYG": "하이일드 회사채", "USO": "WTI 유가", "UUP": "달러"}


def slope(ma, lag, flat=0.002):
    """lag 봉 전 대비 변화율로 방향을 정한다. 0.2% 미만이면 횡보."""
    if len(ma) <= lag or ma[-1] is None or ma[-1 - lag] is None:
        return None, None
    ch = ma[-1] / ma[-1 - lag] - 1
    return ("↑" if ch > flat else "↓" if ch < -flat else "→"), ch


def realized_vol(closes, n=20):
    rets = [math.log(closes[i] / closes[i - 1]) for i in range(len(closes) - n, len(closes))]
    return statistics.pstdev(rets) * math.sqrt(252)


def analyze(bars, daily=False):
    closes = [b["c"] for b in bars]
    out = {"price": closes[-1], "time": bars[-1]["t"]}
    for n, lag in ((5, 1), (20, 3), (60, 3)):
        ma = ma_series(closes, n)
        d, ch = slope(ma, lag)
        out[f"ma{n}"], out[f"s{n}"], out[f"c{n}"] = ma[-1], d, ch
    out["above"] = [n for n in (5, 20, 60) if out[f"ma{n}"] is not None and out["price"] > out[f"ma{n}"]]
    if out["ma60"]:
        out["gap60"] = out["price"] / out["ma60"] - 1  # 60선 이격도
    if daily and len(closes) > 270:
        now = realized_vol(closes)
        hist = [realized_vol(closes[:k]) for k in range(len(closes) - 250, len(closes), 5)]
        med = statistics.median(hist)
        out["vol"], out["vol_med"] = now, med
        out["vol_state"] = "확대" if now > med * 1.5 else "보통" if now > med * 0.7 else "축소"
    return out


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--symbols", nargs="+", default=["VIXM", "HYG", "USO", "UUP"])
    p.add_argument("--state")
    p.add_argument("--delay", type=float, default=8.0)
    a = p.parse_args()

    result, first = {}, True
    for sym in a.symbols:
        for tf, interval, size in TFS:
            if not first:
                time.sleep(a.delay)
            first = False
            result[f"{sym} {tf}"] = analyze(fetch(sym, interval, size), daily=(tf == "일봉"))

    old = {}
    if a.state and os.path.exists(a.state):
        with open(a.state, encoding="utf-8") as f:
            old = json.load(f)
    new_state = {}

    print("위험·펀더멘털 지표 (5선: 1봉 전 대비, 20·60선: 3봉 전 대비 / ↑상승 ↓하락 →횡보)\n")
    for sym in a.symbols:
        kind = KIND.get(sym, "direction")
        print(f"[{sym} · {LABEL.get(sym, sym)} · {'방향 지표' if kind == 'direction' else '안정 지표(적정선 유지가 중요)'}]")
        for tf, _, _ in TFS:
            r = result[f"{sym} {tf}"]
            key = f"{sym} {tf}"
            sig = f"{r['s5']}{r['s20']}{r['s60'] or '-'}"
            if r.get("vol_state"):
                sig += f" 변동성{r['vol_state']}"
            new_state[key] = sig
            mark = "CHANGE " if a.state and old.get(key) and old[key] != sig else ""
            c20 = f"{r['c20']*100:+.1f}%" if r["c20"] is not None else "-"
            gap = f" | 60선 이격 {r['gap60']*100:+.1f}%" if r.get("gap60") is not None else ""
            vol = (f" | 20일 변동성 {r['vol']*100:.0f}% (1년 중앙값 {r['vol_med']*100:.0f}%, {r['vol_state']})"
                   if r.get("vol_state") else "")
            above = "/".join(map(str, r["above"])) or "없음"
            print(f"  {mark}{tf} {r['time'][:10]} 종가 {r['price']:.2f} | 5선{r['s5']} 20선{r['s20']}({c20}) "
                  f"60선{r['s60'] or '-'} | 가격 위의 선: {above}{gap}{vol}")
        print()

    if a.state:
        with open(a.state, "w", encoding="utf-8") as f:
            json.dump(new_state, f, ensure_ascii=False)


if __name__ == "__main__":
    main()
