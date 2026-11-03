import React from "react";
import { AbsoluteFill, Audio, Easing, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ArchCast, Star, ZelligeBackground } from "./components/Decor";
import { EpisodeBadge, SeriesSubtitle, SeriesTitle } from "./components/Titles";
import { COLORS } from "./theme";

export type OpeningProps = { number: number; titleAr: string; titleKo: string };

export const OPENING_FRAMES = 48; // 2 s at 24 fps

/** Full-screen title card (2 s) shown before the episode. */
export const Opening: React.FC<OpeningProps> = ({ number, titleAr, titleKo }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const pop = (delay: number, damping = 11) => spring({ frame: frame - delay, fps, config: { damping, mass: 0.6 } });

  const starIn = pop(0, 14);
  const title = pop(3);
  const sub = pop(10);
  const arch = pop(8, 16);
  const badge = pop(16);

  const exit = interpolate(frame, [durationInFrames - 7, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.night }}>
      <AbsoluteFill style={{ transform: `scale(${1 + exit * 0.12})`, opacity: 1 - exit }}>
        <ZelligeBackground />

        {/* star burst behind the title */}
        <AbsoluteFill style={{ alignItems: "center", top: 40 }}>
          <Star
            size={620}
            color="rgba(242,195,91,0.10)"
            stroke="rgba(242,195,91,0.45)"
            strokeWidth={0.8}
            style={{ transform: `scale(${starIn}) rotate(${interpolate(frame, [0, 48], [-60, 20])}deg)` }}
          />
        </AbsoluteFill>

        <AbsoluteFill style={{ alignItems: "center", top: 200 }}>
          <SeriesTitle size={200} style={{ transform: `translateY(${(1 - title) * 60}px) scale(${0.6 + 0.4 * title})`, opacity: title }} />
          <SeriesSubtitle size={50} style={{ marginTop: 6, opacity: sub, transform: `translateY(${(1 - sub) * 30}px)` }} />
        </AbsoluteFill>

        <AbsoluteFill style={{ alignItems: "center", top: 600 }}>
          <div style={{ transform: `translateY(${(1 - arch) * 420}px)`, opacity: Math.min(1, arch * 1.5) }}>
            <ArchCast width={940} height={760} reveal={arch} />
          </div>
        </AbsoluteFill>

        <AbsoluteFill style={{ alignItems: "center", top: 1410 }}>
          <div style={{ transform: `scale(${badge})`, opacity: badge }}>
            <EpisodeBadge number={number} titleAr={titleAr} titleKo={titleKo} />
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      <Audio src={staticFile("sfx/whoosh.wav")} volume={0.7} />
      <Sequence from={5}>
        <Audio src={staticFile("sfx/chime.wav")} volume={0.6} />
      </Sequence>
    </AbsoluteFill>
  );
};

/**
 * Lighter alternative for Reels: the episode starts immediately (no lost hook) and a
 * compact title banner slides in at the top for the first ~2.5 s, then slides away.
 */
export const TitleOverlay: React.FC<OpeningProps> = ({ number, titleAr, titleKo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inP = spring({ frame: frame - 2, fps, config: { damping: 13, mass: 0.6 } });
  const outP = interpolate(frame, [52, 62], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const y = (1 - inP) * -260 + outP * -320;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          height: 520,
          background: "linear-gradient(180deg, rgba(20,6,10,0.85) 0%, rgba(20,6,10,0.55) 55%, rgba(20,6,10,0) 100%)",
          opacity: inP * (1 - outP),
        }}
      />
      <AbsoluteFill style={{ alignItems: "center", top: 190, transform: `translateY(${y}px)` }}>
        <SeriesTitle size={120} />
        <div style={{ marginTop: 4 }}>
          <EpisodeBadge number={number} titleAr={titleAr} titleKo={titleKo} scale={0.78} />
        </div>
      </AbsoluteFill>
      <Sequence from={2}>
        <Audio src={staticFile("sfx/chime.wav")} volume={0.35} />
      </Sequence>
    </AbsoluteFill>
  );
};
