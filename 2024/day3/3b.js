import { readInput } from "../../inputUtils.js";

const getMultiplications = (line) => {
  const matches = [
    ...line.matchAll(/(?<=mul)\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g),
  ];

  let enabled = true;
  let score = 0;
  for (const match of matches) {
    if (match[0] === "do()") enabled = true;
    else if (match[0] === "don't()") enabled = false;
    else if (enabled)
      score += match[0]
        .slice(1, -1)
        .split(",")
        .map(Number)
        .reduce((a, b) => a * b, 1);
  }

  return score;
};

export function solve(input) {
  const lines = input.split("\n").join("");

  return getMultiplications(lines);
}

console.log(solve(readInput(import.meta.url)));
