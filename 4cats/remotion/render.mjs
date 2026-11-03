// Usage: npm run render:ep -- episodes/ep3.json
// Output: out/ep3_final.mp4 (1080x1920, 24 fps, H.264 + AAC — ready for Instagram Reels)
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, mkdirSync } from "node:fs";
import { basename } from "node:path";

const propsPath = process.argv[2];
if (!propsPath) {
  console.error("Usage: npm run render:ep -- episodes/epN.json");
  process.exit(1);
}
const props = JSON.parse(readFileSync(propsPath, "utf8"));
if (!existsSync(`public/${props.video}`)) {
  console.error(`Missing video: put the Manus clip at public/${props.video}`);
  process.exit(1);
}
mkdirSync("out", { recursive: true });
const out = `out/${basename(propsPath, ".json")}_final.mp4`;
const args = ["remotion", "render", "Episode", out, `--props=${propsPath}`];
// Use a locally installed headless Chromium when one exists (e.g. cloud sessions); otherwise Remotion downloads its own.
const shell = "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
if (existsSync(shell)) args.push(`--browser-executable=${shell}`);
execFileSync("npx", args, { stdio: "inherit" });
console.log(`\nDone: ${out}`);
