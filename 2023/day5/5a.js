import { readInput } from "../../inputUtils.js";

function between(num, min, max) {
  return num >= min && num <= max;
}

export function solve(input) {
  const lines = input.split(/\r?\n\r?\n/);
  const numberOfMaps = lines.length - 1; // remove seeds from number of maps

  let seeds = lines[0]
    .split(": ")[1]
    .split(" ")
    .map((seed) => parseInt(seed));

  for (let i = 1; i <= numberOfMaps; i++) {
    let map = lines[i]
      .split(":")[1]
      .split(/\n/)
      .filter((e) => e !== "");

    seedLoop: for (let k = 0; k < seeds.length; k++) {
      for (let j = 0; j < map.length; j++) {
        let nums = map[j].split(" ").map((num) => parseInt(num));
        let source = nums[0];
        let start = nums[1];
        let range = nums[2];
        if (between(seeds[k], start, start + range)) {
          seeds[k] = source + (seeds[k] - start);
          continue seedLoop;
        }
      }
    }
  }
  return Math.min(...seeds);
}

console.log(solve(readInput(import.meta.url)));
