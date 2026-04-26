import { rmSync } from "node:fs";
import { resolve } from "node:path";

const nextDir = resolve(".next");

rmSync(nextDir, { recursive: true, force: true });

console.log(`Removed ${nextDir}`);
