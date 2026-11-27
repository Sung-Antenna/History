#!/usr/bin/env python3
"""위험 지표(공포·유가·신용) 3종의 월봉·주봉·일봉 이평선 기울기를 매일 본다 (사용자 요청 2026-11-27).

기본 종목: VIXM(VIX 중기선물 ETF), USO(WTI 원유 ETF), HYG(하이일드 회사채 ETF).
해석 방향:
  - VIXM ↑ = 공포 확대(위험자산에 불리). ↓ = 공포 진정.
  - HYG  ↓ = 신용 스트레스(하이일드 매도). ↑ = 신용 안정.
  - USO  ↑ = 유가 상승(인플레 부담). ↓ = 유가 하락.

사용:
  python3 macro_trend.py                 # 기본 3종
  python3 macro_trend.py --symbols VIXM HYG
  python3 macro_trend.py --state .macro_state.json   # 기울기 방향이 바뀐 것만 CHANGE 로 표시
Twelve Data 무료 한도(분당 8회) 때문에 요청 사이에 쉰다.
"""
import argparse
import json
import os
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from jugajido_scan import fetch, ma_series  # noqa: E402

TFS = (("월봉", "1month", 200), ("주봉", "1week", 300), ("일봉", "1day", 300))
MEANING = {
    "VIXM": {"up": "공포 확대", "down": "공포 진정"},
    "HYG": {"up": "신용 안정", "down": "신용 스트레스"},
    "USO": {"up": "유가 상승", "down": "유가 하락"},
}


def slope(ma, lag, flat=0.002):
    """lag 봉 전 대비 변화율로 방향을 정한다. 0.2% 미만이면 횡보."""
    if len(ma) <= lag or ma[-1] is None or ma[-1 - lag] is None:
        return None, None
    ch = ma[-1] / ma[-1 - lag] - 1
    return ("↑" if ch > flat else "↓" if ch < -flat else "→"), ch


def analyze(bars):
    closes = [b["c"] for b in bars]
    out = {"price": closes[-1], "time": bars[-1]["t"]}
    for n, lag in ((5, 1), (20, 3), (60, 3)):
        ma = ma_series(closes, n)
        d, ch = slope(ma, lag)
        out[f"ma{n}"] = ma[-1]
        out[f"s{n}"] = d
        out[f"c{n}"] = ch
    above = [n for n in (5, 20, 60) if out[f"ma{n}"] is not None and out["price"] > out[f"ma{n}"]]
    out["above"] = above
    return out


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--symbols", nargs="+", default=["VIXM", "USO", "HYG"])
    p.add_argument("--state")
    p.add_argument("--delay", type=float, default=8.0)
    a = p.parse_args()

    result, first = {}, True
    for sym in a.symbols:
        for tf, interval, size in TFS:
            if not first:
                time.sleep(a.delay)
            first = False
            result[f"{sym} {tf}"] = analyze(fetch(sym, interval, size))

    old = {}
    if a.state and os.path.exists(a.state):
        with open(a.state, encoding="utf-8") as f:
            old = json.load(f)
    new_state = {}

    print("위험 지표 기울기 (5선: 1봉 전 대비, 20·60선: 3봉 전 대비 / ↑상승 ↓하락 →횡보)\n")
    for sym in a.symbols:
        print(f"[{sym}]")
        for tf, _, _ in TFS:
            r = result[f"{sym} {tf}"]
            key = f"{sym} {tf}"
            sig = f"{r['s5']}{r['s20']}{r['s60'] or '-'}"
            new_state[key] = sig
            mark = "CHANGE " if a.state and old.get(key) and old[key] != sig else ""
            m = MEANING.get(sym, {})
            trend = m.get("up") if r["s20"] == "↑" else m.get("down") if r["s20"] == "↓" else "방향 탐색"
            c20 = f"{r['c20']*100:+.1f}%" if r["c20"] is not None else "-"
            above = "/".join(map(str, r["above"])) or "없음"
            print(f"  {mark}{tf} {r['time'][:10]} 종가 {r['price']:.2f} | 5선{r['s5']} 20선{r['s20']}({c20}) "
                  f"60선{r['s60'] or '-'} | 가격이 위에 있는 선: {above} | 20선 기준: {trend}")
        print()

    if a.state:
        with open(a.state, "w", encoding="utf-8") as f:
            json.dump(new_state, f, ensure_ascii=False)


if __name__ == "__main__":
    main()
