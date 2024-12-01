import { readInput } from "../../inputUtils.js";

export function solve(input) {
  const lines = input.split("\n");

  const left = [];
  const right = [];

  lines.forEach((line) => {
    const [l, r] = line.split(/\s+/);
    left.push(parseInt(l));
    right.push(parseInt(r));
  });

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  return left.reduce((a, b, i) => (a += Math.abs(b - right[i])), 0);
}

console.log(solve(readInput(import.meta.url)));
