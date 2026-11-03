import React from "react";
import { COLORS, FONT_AR_TEXT, FONT_AR_TITLE, FONT_KO_TITLE, goldText } from "../theme";

export const SERIES_TITLE = "عائلة حبيبة";
export const SERIES_SUBTITLE = "دار الضحك والمشاكل العجيبة";

/** Gold calligraphic series title. */
export const SeriesTitle: React.FC<{ size: number; style?: React.CSSProperties }> = ({ size, style }) => (
  <div
    dir="rtl"
    style={{
      fontFamily: FONT_AR_TITLE,
      fontSize: size,
      lineHeight: 1.25,
      textAlign: "center",
      filter: `drop-shadow(0 ${size * 0.04}px 0 ${COLORS.maroonDeep}) drop-shadow(0 0 ${size * 0.12}px rgba(255,190,90,0.55))`,
      ...style,
    }}
  >
    <span style={goldText}>{SERIES_TITLE}</span>
  </div>
);

export const SeriesSubtitle: React.FC<{ size: number; style?: React.CSSProperties }> = ({ size, style }) => (
  <div
    dir="rtl"
    style={{
      fontFamily: FONT_AR_TEXT,
      fontWeight: 700,
      fontSize: size,
      color: COLORS.cream,
      textAlign: "center",
      textShadow: "0 3px 10px rgba(0,0,0,0.7)",
      ...style,
    }}
  >
    {SERIES_SUBTITLE}
  </div>
);

/** Episode badge: «الحلقة 3 · قوانين الدار» + Korean line underneath. */
export const EpisodeBadge: React.FC<{ number: number; titleAr: string; titleKo: string; scale?: number }> = ({
  number,
  titleAr,
  titleKo,
  scale = 1,
}) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 * scale }}>
    <div
      dir="rtl"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18 * scale,
        padding: `${10 * scale}px ${34 * scale}px`,
        borderRadius: 999,
        background: "rgba(20,6,10,0.72)",
        border: `${3 * scale}px solid ${COLORS.gold}`,
        fontFamily: FONT_AR_TEXT,
        fontWeight: 900,
        fontSize: 46 * scale,
        color: COLORS.cream,
      }}
    >
      <span style={{ color: COLORS.gold }}>الحلقة {number}</span>
      <span style={{ opacity: 0.6 }}>·</span>
      <span>{titleAr}</span>
    </div>
    <div style={{ fontFamily: FONT_KO_TITLE, fontSize: 40 * scale, color: COLORS.goldLight, textShadow: "0 3px 10px rgba(0,0,0,0.8)" }}>
      {number}화 · {titleKo}
    </div>
  </div>
);
