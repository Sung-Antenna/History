import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_AR_TEXT, FONT_KO_TEXT, isArabic, SPEAKERS, SpeakerId } from "../theme";

export type Cue = {
  /** seconds, relative to the start of the episode video */
  from: number;
  to: number;
  speaker: SpeakerId;
  /** the line as spoken (Darija in Arabic script, or Korean for Kim) */
  text: string;
  /** translation shown smaller underneath (Korean for Darija lines, Darija for Kim's lines) */
  translation?: string;
};

export type SubtitleStyle = {
  /** distance from the bottom edge. Instagram's caption/buttons cover roughly the bottom 380 px. */
  bottom: number;
  showSpeaker: boolean;
  showTranslation: boolean;
};

const Line: React.FC<{ text: string; size: number; weight: number; color: string; opacity?: number }> = ({ text, size, weight, color, opacity = 1 }) => {
  const ar = isArabic(text);
  return (
    <div
      dir={ar ? "rtl" : "ltr"}
      style={{
        fontFamily: ar ? FONT_AR_TEXT : FONT_KO_TEXT,
        fontWeight: weight,
        fontSize: ar ? size * 1.04 : size,
        lineHeight: ar ? 1.45 : 1.35,
        color,
        opacity,
        textAlign: "center",
        wordBreak: "keep-all",
      }}
    >
      {text}
    </div>
  );
};

const CueCard: React.FC<{ cue: Cue; style: SubtitleStyle }> = ({ cue, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = Math.round(cue.from * fps);
  const end = Math.round(cue.to * fps);
  const local = frame - start;
  const inP = spring({ frame: local, fps, config: { damping: 14, mass: 0.5 } });
  const outP = interpolate(frame, [end - 4, end], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sp = SPEAKERS[cue.speaker];
  const textLen = cue.text.length;
  const size = textLen > 60 ? 46 : textLen > 38 ? 52 : 60;

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: style.bottom }}>
      <div
        style={{
          position: "relative",
          maxWidth: 960,
          padding: "26px 40px 24px",
          borderRadius: 34,
          background: "rgba(18,8,10,0.78)",
          border: `4px solid ${sp.color}`,
          boxShadow: `0 10px 40px rgba(0,0,0,0.45), 0 0 0 2px rgba(255,255,255,0.06) inset`,
          transform: `translateY(${(1 - inP) * 40 + outP * 20}px) scale(${0.92 + 0.08 * inP})`,
          opacity: Math.min(inP * 1.4, 1) * (1 - outP),
        }}
      >
        {style.showSpeaker && (
          <div
            style={{
              position: "absolute",
              top: -30,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 12,
              alignItems: "center",
              padding: "6px 22px",
              borderRadius: 999,
              background: sp.color,
              color: "#fff",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
            }}
          >
            <span dir="rtl" style={{ fontFamily: FONT_AR_TEXT, fontWeight: 900, fontSize: 32 }}>{sp.ar}</span>
            <span style={{ fontFamily: FONT_KO_TEXT, fontWeight: 700, fontSize: 26, opacity: 0.9 }}>{sp.ko}</span>
          </div>
        )}
        <Line text={cue.text} size={size} weight={900} color="#ffffff" />
        {style.showTranslation && cue.translation && (
          <div style={{ marginTop: 8 }}>
            <Line text={cue.translation} size={size * 0.68} weight={700} color="#ffe6a6" opacity={0.95} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

/** Renders whichever cue is active at the current frame. */
export const Subtitles: React.FC<{ cues: Cue[]; style: SubtitleStyle }> = ({ cues, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const active = cues.filter((c) => t >= c.from && t < c.to);
  return (
    <>
      {active.map((c) => (
        <CueCard key={`${c.from}-${c.speaker}`} cue={c} style={style} />
      ))}
    </>
  );
};
