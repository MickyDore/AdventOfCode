import { readInput } from "../../inputUtils.js";
import { Worker } from "worker_threads";

// An absolutely disgusting brute force method using worker threads
// Given a location value, do inverse mapping to find the original seed number
// Find the first location value that maps to a real seed number
// @TODO - come back and refactor this to minimise searches from overlapping ranges
function runWorkers(lines, seeds) {
  const SEED_RANGE = 4_000_000;
  const WORKERS = 8;

  let foundSeeds = [];
  let completedWorkers = 0;

  for (let i = 0; i < WORKERS; i++) {
    const worker = new Worker("./worker.js");
    worker.postMessage({
      min: i * SEED_RANGE,
      max: (i + 1) * SEED_RANGE,
      lines,
      seeds,
    });
    worker.on("message", (seed) => {
      completedWorkers++;
      if (seed) {
        console.log(`Worker ${i} found seed ${seed}`);
        foundSeeds.push(seed);
      }
      if (completedWorkers === WORKERS) {
        return Math.min(...foundSeeds);
      }
    });
  }
}
export function solve(input) {
  const lines = input.split(/\r?\n\r?\n/);
  const seeds = lines[0]
    .split(": ")[1]
    .split(" ")
    .map((seed) => parseInt(seed));

  runWorkers(lines, seeds);
}

console.log(solve(readInput(import.meta.url)));
