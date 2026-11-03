import React from "react";
import { Composition } from "remotion";
import ep3 from "../episodes/ep3.json";
import { Ending, ENDING_FRAMES } from "./Ending";
import { Episode, episodeFrames, EpisodeProps } from "./Episode";
import { Opening, OPENING_FRAMES } from "./Opening";
import { FPS, HEIGHT, WIDTH } from "./theme";
import { withFonts } from "./FontGate";

const EpisodeF = withFonts(Episode);
const OpeningF = withFonts(Opening);
const EndingF = withFonts(Ending);

const sample = ep3 as EpisodeProps;

export const RemotionRoot: React.FC = () => (
  <>
    {/* Full episode: opening + Manus video with subtitles + ending. Pass another episodes/epN.json with --props. */}
    <Composition
      id="Episode"
      component={EpisodeF}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      durationInFrames={episodeFrames(sample)}
      defaultProps={sample}
      calculateMetadata={({ props }) => ({ durationInFrames: episodeFrames(props) })}
    />
    <Composition
      id="Opening"
      component={OpeningF}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      durationInFrames={OPENING_FRAMES}
      defaultProps={{ number: sample.number, titleAr: sample.titleAr, titleKo: sample.titleKo }}
    />
    <Composition
      id="Ending"
      component={EndingF}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      durationInFrames={ENDING_FRAMES}
      defaultProps={{ nextTeaserAr: sample.nextTeaserAr, nextTeaserKo: sample.nextTeaserKo }}
    />
  </>
);
