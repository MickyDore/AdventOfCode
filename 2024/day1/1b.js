import { readInput } from "../../inputUtils.js";

export function solve(input) {
  const lines = input.split("\n");

  const freqMap = {};

  const left = [];
  const right = [];

  lines.forEach((line) => {
    const [l, r] = line.split(/\s+/);
    left.push(parseInt(l));
    right.push(parseInt(r));
  });

  right.forEach((num) => (freqMap[num] = (freqMap[num] ?? 0) + num));
  return left.reduce((a, b) => (a += freqMap[b] || 0), 0);
}

console.log(solve(readInput(import.meta.url)));
