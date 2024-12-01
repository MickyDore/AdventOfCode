import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

export function readInput(callerUrl, fileName = "input.txt") {
  const callerDir = dirname(fileURLToPath(callerUrl));
  const inputPath = resolve(callerDir, fileName);

  return readFileSync(inputPath).toString().trim();
}
