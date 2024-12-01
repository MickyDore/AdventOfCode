import { readInput } from "../../inputUtils.js";

export function solve(input) {
  console.log(input);
  const lines = input.split("\n");
  return lines
    .map((line) => {
      const nums = line.replace(/\D+/g, ""); // leave only numbers

      return parseInt("" + nums[0] + nums.at(-1));
    })
    .reduce((a, b) => a + b, 0);
}

console.log(solve(readInput(import.meta.url)));
