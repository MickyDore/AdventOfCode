import { readInput } from "../../inputUtils.js";

const getMultiplications = (line) => {
  const matches = [...line.matchAll(/(?<=mul)\(\d{1,3},\d{1,3}\)/g)].map(
    (match) => match[0].slice(1, -1).split(",").map(Number)
  );

  return matches.reduce((a, b) => a + b.reduce((a, b) => a * b, 1), 0);
};

export function solve(input) {
  const lines = input.split("\n");

  return lines.reduce((a, b) => a + getMultiplications(b), 0);
}

console.log(solve(readInput(import.meta.url)));
