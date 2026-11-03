import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ArchCast, ZelligeBackground } from "./components/Decor";
import { SeriesTitle } from "./components/Titles";
import { COLORS, FONT_AR_TITLE, FONT_KO_TITLE, goldText } from "./theme";

export const ENDING_FRAMES = 72; // 3 s at 24 fps

/** "To be continued" end card (3 s) with the cast in the arch and a robot beep. */
export const Ending: React.FC<{ nextTeaserAr?: string; nextTeaserKo?: string }> = ({ nextTeaserAr, nextTeaserKo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = (delay: number, damping = 11) => spring({ frame: frame - delay, fps, config: { damping, mass: 0.6 } });
  const fadeIn = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  const arch = pop(2, 16);
  const big = pop(8);
  const ko = pop(14);
  const teaser = pop(22);
  const logo = pop(28);
  // the dots of «يتبع…» blink like the robot's eyes
  const dots = Math.floor(frame / 6) % 4;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.night, opacity: fadeIn }}>
      <ZelligeBackground drift={-0.5} />

      <AbsoluteFill style={{ alignItems: "center", top: 240 }}>
        <div style={{ transform: `scale(${0.85 + 0.15 * arch})`, opacity: arch }}>
          <ArchCast width={940} height={760} reveal={arch} />
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", top: 1030 }}>
        <div
          dir="rtl"
          style={{
            fontFamily: FONT_AR_TITLE,
            fontSize: 170,
            lineHeight: 1.2,
            transform: `scale(${big})`,
            filter: `drop-shadow(0 6px 0 ${COLORS.maroonDeep}) drop-shadow(0 0 22px rgba(255,190,90,0.5))`,
          }}
        >
          <span style={goldText}>يتبع{".".repeat(dots)}</span>
          <span style={{ visibility: "hidden" }}>{".".repeat(3 - dots)}</span>
        </div>
        <div
          style={{
            fontFamily: FONT_KO_TITLE,
            fontSize: 64,
            color: COLORS.cream,
            marginTop: -10,
            opacity: ko,
            transform: `translateY(${(1 - ko) * 30}px)`,
            textShadow: "0 3px 12px rgba(0,0,0,0.8)",
          }}
        >
          다음 화에 계속
        </div>
        {(nextTeaserAr || nextTeaserKo) && (
          <div style={{ marginTop: 26, textAlign: "center", opacity: teaser, transform: `translateY(${(1 - teaser) * 20}px)` }}>
            {nextTeaserAr && (
              <div dir="rtl" style={{ fontFamily: FONT_AR_TITLE, fontSize: 52, color: COLORS.goldLight }}>
                {nextTeaserAr}
              </div>
            )}
            {nextTeaserKo && <div style={{ fontFamily: FONT_KO_TITLE, fontSize: 40, color: COLORS.cream, opacity: 0.85 }}>{nextTeaserKo}</div>}
          </div>
        )}
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 300 }}>
        <SeriesTitle size={84} style={{ opacity: logo * 0.9 }} />
      </AbsoluteFill>

      <Sequence from={10}>
        <Audio src={staticFile("sfx/robot_beep.wav")} volume={0.6} />
      </Sequence>
    </AbsoluteFill>
  );
};
