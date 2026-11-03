import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import { Cue, Subtitles, SubtitleStyle } from "./components/Subtitles";
import { Ending, ENDING_FRAMES } from "./Ending";
import { Opening, OPENING_FRAMES, TitleOverlay } from "./Opening";
import { COLORS, FPS } from "./theme";

export type EpisodeProps = {
  number: number;
  titleAr: string;
  titleKo: string;
  /** path inside public/, e.g. "episodes/ep3.mp4" */
  video: string;
  /** length of the episode video in seconds */
  videoSeconds: number;
  /** "card" = 2 s title card before the video, "overlay" = title banner over the first 2.5 s, "none" */
  opening: "card" | "overlay" | "none";
  ending: boolean;
  nextTeaserAr?: string;
  nextTeaserKo?: string;
  subtitles: SubtitleStyle;
  cues: Cue[];
};

export const episodeFrames = (p: EpisodeProps) =>
  (p.opening === "card" ? OPENING_FRAMES : 0) + Math.round(p.videoSeconds * FPS) + (p.ending ? ENDING_FRAMES : 0);

export const Episode: React.FC<EpisodeProps> = (p) => {
  const openFrames = p.opening === "card" ? OPENING_FRAMES : 0;
  const videoFrames = Math.round(p.videoSeconds * FPS);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.night }}>
      {p.opening === "card" && (
        <Sequence durationInFrames={OPENING_FRAMES} name="Opening">
          <Opening number={p.number} titleAr={p.titleAr} titleKo={p.titleKo} />
        </Sequence>
      )}

      <Sequence from={openFrames} durationInFrames={videoFrames} name="Episode video">
        {/* source clips are 768x1344; cover-fit to 1080x1920 */}
        <OffthreadVideo src={staticFile(p.video)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <Subtitles cues={p.cues} style={p.subtitles} />
        {p.opening === "overlay" && <TitleOverlay number={p.number} titleAr={p.titleAr} titleKo={p.titleKo} />}
      </Sequence>

      {p.ending && (
        <Sequence from={openFrames + videoFrames} durationInFrames={ENDING_FRAMES} name="Ending">
          <Ending nextTeaserAr={p.nextTeaserAr} nextTeaserKo={p.nextTeaserKo} />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
