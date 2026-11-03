import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

// 8-point star (two overlapping squares) — the Moroccan zellige / khatam motif.
export const starPoints = (cx: number, cy: number, r: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 16; i++) {
    const a = (Math.PI / 8) * i - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.72;
    pts.push(`${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`);
  }
  return pts.join(" ");
};

export const Star: React.FC<{ size: number; color?: string; stroke?: string; strokeWidth?: number; style?: React.CSSProperties }> = ({
  size,
  color = COLORS.gold,
  stroke,
  strokeWidth = 0,
  style,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
    <polygon points={starPoints(50, 50, 48)} fill={color} stroke={stroke} strokeWidth={strokeWidth} />
  </svg>
);

/** Warm night background with a slowly drifting zellige star lattice and lantern glow. */
export const ZelligeBackground: React.FC<{ drift?: number }> = ({ drift = 0.6 }) => {
  const frame = useCurrentFrame();
  const offset = frame * drift;
  const tile = 150;
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 38%, ${COLORS.maroon} 0%, ${COLORS.maroonDeep} 55%, ${COLORS.night} 100%)` }}>
      <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.16 }}>
        <defs>
          <pattern id="zellige" width={tile} height={tile} patternUnits="userSpaceOnUse" patternTransform={`translate(${offset} ${offset * 0.5})`}>
            <polygon points={starPoints(tile / 2, tile / 2, 48)} fill="none" stroke={COLORS.gold} strokeWidth={3} />
            <polygon points={starPoints(tile / 2, tile / 2, 20)} fill={COLORS.gold} />
            <polygon points={`0,${tile / 2 - 14} 14,${tile / 2} 0,${tile / 2 + 14} -14,${tile / 2}`} fill={COLORS.teal} />
            <polygon points={`${tile},${tile / 2 - 14} ${tile + 14},${tile / 2} ${tile},${tile / 2 + 14} ${tile - 14},${tile / 2}`} fill={COLORS.teal} />
            <polygon points={`${tile / 2 - 14},0 ${tile / 2},14 ${tile / 2 + 14},0 ${tile / 2},-14`} fill={COLORS.teal} />
            <polygon points={`${tile / 2 - 14},${tile} ${tile / 2},${tile + 14} ${tile / 2 + 14},${tile} ${tile / 2},${tile - 14}`} fill={COLORS.teal} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#zellige)" />
      </svg>
      {/* lantern glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 30%, rgba(255,200,110,${0.22 + 0.04 * Math.sin(frame / 5)}) 0%, rgba(255,170,80,0) 45%)`,
        }}
      />
      {/* vignette */}
      <AbsoluteFill style={{ boxShadow: "inset 0 0 260px 80px rgba(0,0,0,0.75)" }} />
    </AbsoluteFill>
  );
};

/** Horseshoe arch (Moroccan bab) framing the cast line-up. */
export const ArchCast: React.FC<{ width: number; height: number; reveal: number }> = ({ width, height, reveal }) => {
  const R = width / 2;
  const a = (25 * Math.PI) / 180;
  const x1 = R - R * Math.cos(a);
  const y1 = R + R * Math.sin(a);
  const d = `M${x1},${height} L${x1},${y1} A${R},${R} 0 1 1 ${width - x1},${y1} L${width - x1},${height} Z`;
  const imgScale = interpolate(reveal, [0, 1], [1.12, 1]);
  return (
    <div style={{ position: "relative", width, height }}>
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <clipPath id="arch">
            <path d={d} />
          </clipPath>
        </defs>
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: "url(#arch)",
          overflow: "hidden",
          // warm Casablanca sunset behind the cast, matching the photo's light
          background: "linear-gradient(180deg, #f7c97a 0%, #eea456 55%, #d97b3a 100%)",
        }}
      >
        {/* the line-up is landscape: fit it to the arch width and sit it on the floor, so no head is cut by the curve */}
        <Img
          src={staticFile("img/cast_lineup.png")}
          style={{
            position: "absolute",
            width: "100%",
            left: 0,
            bottom: 0,
            transform: `scale(${imgScale})`,
            transformOrigin: "50% 100%",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 12%)",
            maskImage: "linear-gradient(180deg, transparent 0%, #000 12%)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 75%, rgba(20,6,10,0.5) 100%)" }} />
      </div>
      <svg width={width} height={height} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <path d={d} fill="none" stroke={COLORS.gold} strokeWidth={14} />
        <path d={d} fill="none" stroke={COLORS.goldLight} strokeWidth={3} transform={`translate(0 0)`} opacity={0.8} />
      </svg>
    </div>
  );
};
