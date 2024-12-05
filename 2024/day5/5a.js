import { readInput } from "../../inputUtils.js";

const rulesMap = {};

const createRulesMap = (rules) => {
  const parsed = rules.split("\n").map((line) => line.split("|").map(Number));

  parsed.forEach((rule) => {
    const [l, r] = rule;
    if (!rulesMap[l]) rulesMap[l] = [r];
    else rulesMap[l].push(r);
  });
};

const updateIsSafe = (update) => {
  let isSafe = true;

  update.forEach((number, index) => {
    if (index === 0) return;

    let slice = update.slice(0, index);

    if (!rulesMap[number]) return;
    let safe = !slice.some((num) => {
      return rulesMap[number].includes(num);
    });

    if (!safe) isSafe = false;
  });

  return isSafe;
};

export function solve(input) {
  const [rules, updates] = input.split("\n\n");

  const parsedUpdates = updates
    .split("\n")
    .map((line) => line.split(",").map(Number));

  createRulesMap(rules);

  let sum = 0;
  parsedUpdates.forEach((update) => {
    if (updateIsSafe(update)) sum += update[Math.ceil(update.length / 2) - 1];
  });

  return sum;
}

console.log(solve(readInput(import.meta.url)));
