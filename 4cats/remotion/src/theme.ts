import "@fontsource/lalezar/400.css";
import "@fontsource/jua/400.css";
import "@fontsource/cairo/700.css";
import "@fontsource/cairo/900.css";
import "@fontsource/noto-sans-kr/700.css";
import "@fontsource/noto-sans-kr/900.css";

// Fonts are bundled from npm (no network needed at render time).
// Arabic display / Korean display / Arabic subtitles / Korean subtitles
export const FONT_AR_TITLE = "Lalezar";
export const FONT_KO_TITLE = "Jua";
export const FONT_AR_TEXT = "Cairo";
export const FONT_KO_TEXT = "Noto Sans KR";

export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 24;

export const COLORS = {
  night: "#14060a",
  maroon: "#4a0f1a",
  maroonDeep: "#2a0810",
  gold: "#f2c35b",
  goldLight: "#ffe9a8",
  goldDark: "#a8701c",
  cream: "#fff6e3",
  teal: "#19b5b0",
};

export type SpeakerId = "habiba" | "chakilita" | "zouitina" | "kim" | "robot" | "attendant";

export const SPEAKERS: Record<SpeakerId, { ar: string; ko: string; color: string }> = {
  habiba: { ar: "حبيبة", ko: "하비바", color: "#c4162f" },
  chakilita: { ar: "شكيليطة", ko: "샤킬리타", color: "#e5709b" },
  zouitina: { ar: "زويتينة", ko: "주이티나", color: "#1f9a52" },
  kim: { ar: "كيم", ko: "킴", color: "#2a5bd7" },
  robot: { ar: "الروبو", ko: "로봇", color: COLORS.teal },
  attendant: { ar: "الكسّال", ko: "때밀이", color: "#7a5230" },
};

// Arabic text needs RTL, Korean LTR. Detect from the first strong character.
export const isArabic = (s: string) => /[؀-ۿ]/.test(s);

export const goldText: React.CSSProperties = {
  backgroundImage: `linear-gradient(180deg, ${COLORS.goldLight} 0%, ${COLORS.gold} 45%, ${COLORS.goldDark} 100%)`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};
