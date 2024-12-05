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

const fixUpdate = (update) => {
  let pointer = update.length - 1;

  // start from the end and work back, if we find an out of place number, swap them and start from the end again
  while (pointer !== 0) {
    let num = update[pointer];
    let slice = update.slice(0, pointer);

    if (!rulesMap[num] || rulesMap[num]?.every((num) => !slice.includes(num))) {
      pointer--;
      continue;
    }

    for (let i = 0; i < slice.length; i++) {
      if (rulesMap[num].includes(slice[i])) {
        [update[i], update[pointer]] = [update[pointer], update[i]];

        pointer = update.length - 1;
        break;
      }
    }
  }

  return update;
};

export function solve(input) {
  const [rules, updates] = input.split("\n\n");

  const parsedUpdates = updates
    .split("\n")
    .map((line) => line.split(",").map(Number));

  createRulesMap(rules);

  let sum = 0;
  parsedUpdates.forEach((update) => {
    if (!updateIsSafe(update)) {
      let newUpdate = fixUpdate(update);
      sum += newUpdate[Math.ceil(newUpdate.length / 2) - 1];
    }
  });

  return sum;
}

console.log(solve(readInput(import.meta.url)));
