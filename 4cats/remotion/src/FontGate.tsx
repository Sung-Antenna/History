import React, { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";
import { FONT_AR_TEXT, FONT_AR_TITLE, FONT_KO_TEXT, FONT_KO_TITLE } from "./theme";

const FIXED_TEXT = "عائلة حبيبة دار الضحك والمشاكل العجيبة يتبع الحلقة 0123456789 다음 화에 계속 하비바 샤킬리타 주이티나 킴 로봇 حبيبة شكيليطة زويتينة كيم الروبو";

/**
 * Holds rendering until every font face actually used by this video is loaded.
 * Fonts are split by unicode-range, so we ask the browser to load the exact text we will draw.
 */
export const withFonts = <P extends object>(Component: React.FC<P>): React.FC<P> => {
  const Wrapped: React.FC<P> = (props) => {
    const [handle] = useState(() => delayRender("Loading fonts"));
    useEffect(() => {
      const text = FIXED_TEXT + " " + JSON.stringify(props);
      const faces = [
        `400 100px "${FONT_AR_TITLE}"`,
        `400 100px "${FONT_KO_TITLE}"`,
        `700 100px "${FONT_AR_TEXT}"`,
        `900 100px "${FONT_AR_TEXT}"`,
        `700 100px "${FONT_KO_TEXT}"`,
        `900 100px "${FONT_KO_TEXT}"`,
      ];
      Promise.all(faces.map((f) => document.fonts.load(f, text)))
        .then(() => document.fonts.ready)
        .then(() => continueRender(handle))
        .catch((err) => {
          console.error(err);
          continueRender(handle);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <Component {...props} />;
  };
  return Wrapped;
};
