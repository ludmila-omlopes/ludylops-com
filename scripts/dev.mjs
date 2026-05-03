import { rmSync } from "node:fs";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const nextDir = resolve(".next");
const forwardedArgs = process.argv.slice(2);
const hasBundlerFlag = forwardedArgs.some(
  (arg) => arg === "--webpack" || arg === "--turbopack" || arg === "--turbo"
);
const devArgs = ["dev", ...forwardedArgs];

if (!hasBundlerFlag) {
  devArgs.push("--turbopack");
}

// Windows + Next.js dev mode can occasionally reuse a corrupted chunk graph.
// Starting from a clean .next directory avoids stale runtime chunks, and Turbopack
// avoids the Webpack HMR runtime corruption this machine has hit a few times.
rmSync(nextDir, { recursive: true, force: true });

const child = spawn(
  process.execPath,
  [resolve("node_modules/next/dist/bin/next"), ...devArgs],
  {
    stdio: "inherit",
    env: process.env,
  }
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on("error", (error) => {
  console.error("Failed to start Next.js dev server:", error);
  process.exit(1);
});
