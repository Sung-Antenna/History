#!/usr/bin/env python3
"""한국 종목의 일별 외국인·기관·개인 순매수와 외국인 보유율을 네이버 증권에서 모은다.

사용자 허락: 2026-11-27 ("네이버 금융 수집해도 돼. 필요할 때마다 정보를 얻어보자").
출처: m.stock.naver.com/api/stock/{code}/trend (bizdate부터 과거로 pageSize일씩).
서버 부담을 줄이려고 요청 사이에 쉬고, 필요한 기간만 받는다.

사용 예:
  python3 kr_flows.py 009830 --years 10          # 한화솔루션 10년, 연도별 요약
  python3 kr_flows.py 009830 --years 2 --monthly # 월별 요약
  python3 kr_flows.py 009830 --years 10 --csv out.csv
"""
import argparse
import csv
import json
import sys
import time
import urllib.request
from collections import OrderedDict
from datetime import date, datetime, timedelta

API = "https://m.stock.naver.com/api/stock/{code}/trend?pageSize={size}&bizdate={bizdate}"


def num(s):
    try:
        return float(str(s).replace(",", "").replace("%", "").replace("+", ""))
    except ValueError:
        return None


def fetch(code, bizdate, size=60):
    req = urllib.request.Request(API.format(code=code, size=size, bizdate=bizdate),
                                 headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=20) as r:
        data = json.loads(r.read().decode("utf-8") or "[]")
    return [{
        "date": f"{d['bizdate'][:4]}-{d['bizdate'][4:6]}-{d['bizdate'][6:]}",
        "close": num(d.get("closePrice")),
        "volume": num(d.get("accumulatedTradingVolume")),
        "frgn_net": num(d.get("foreignerPureBuyQuant")),
        "inst_net": num(d.get("organPureBuyQuant")),
        "indv_net": num(d.get("individualPureBuyQuant")),
        "frgn_ratio": num(d.get("foreignerHoldRatio")),
    } for d in data]


def collect(code, years, delay=0.5):
    stop = date(date.today().year - years + 1, 1, 1).isoformat()
    out, seen = [], set()
    bizdate = date.today().strftime("%Y%m%d")
    for _ in range(200):
        rows = [r for r in fetch(code, bizdate) if r["date"] not in seen]
        if not rows:
            break
        for r in rows:
            seen.add(r["date"])
        out.extend(rows)
        oldest = min(r["date"] for r in rows)
        if oldest < stop:
            break
        bizdate = (datetime.strptime(oldest, "%Y-%m-%d") - timedelta(days=1)).strftime("%Y%m%d")
        time.sleep(delay)
    return sorted((r for r in out if r["date"] >= stop), key=lambda x: x["date"])


def summarize(rows, key_len):
    g = OrderedDict()
    for r in rows:
        k = r["date"][:key_len]
        d = g.setdefault(k, {"frgn": 0.0, "inst": 0.0, "indv": 0.0, "frgn_amt": 0.0, "inst_amt": 0.0,
                             "indv_amt": 0.0, "vol": 0.0, "c0": r["close"], "r0": r["frgn_ratio"]})
        px = r["close"] or 0
        for who in ("frgn", "inst", "indv"):
            q = r[f"{who}_net"] or 0
            d[who] += q
            d[f"{who}_amt"] += q * px  # 금액 ≈ 순매수 주식 수 × 종가
        d["vol"] += r["volume"] or 0
        d["c1"], d["r1"] = r["close"], r["frgn_ratio"]
    return g


def main():
    p = argparse.ArgumentParser()
    p.add_argument("code")
    p.add_argument("--years", type=int, default=10)
    p.add_argument("--monthly", action="store_true")
    p.add_argument("--csv")
    a = p.parse_args()
    rows = collect(a.code, a.years)
    if not rows:
        sys.exit("데이터를 받지 못했습니다.")
    if a.csv:
        with open(a.csv, "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=list(rows[0]))
            w.writeheader()
            w.writerows(rows)
    print(f"{a.code}: {rows[0]['date']} ~ {rows[-1]['date']} ({len(rows)}거래일)")
    print("기간 | 종가 시작→끝 | 외국인 보유율 시작→끝 | 순매수 억원≈ (외국인 / 기관 / 개인) | 거래량(만주)")
    for k, d in summarize(rows, 7 if a.monthly else 4).items():
        print(f"{k} | {d['c0']:,.0f}→{d['c1']:,.0f} | {d['r0']:.2f}%→{d['r1']:.2f}% | "
              f"{d['frgn_amt']/1e8:+,.0f} / {d['inst_amt']/1e8:+,.0f} / {d['indv_amt']/1e8:+,.0f} | {d['vol']/1e4:,.0f}")


if __name__ == "__main__":
    main()
