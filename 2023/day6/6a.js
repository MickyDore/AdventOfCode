import { readInput } from "../../inputUtils.js";

export function solve(input) {
  const lines = input.split("\n");

  const times = [...lines[0].matchAll(/\d+/g)].map((arr) => parseInt(arr[0]));
  const distances = [...lines[1].matchAll(/\d+/g)].map((arr) =>
    parseInt(arr[0])
  );

  let waysToWinArr = [];
  for (let i = 0; i < times.length; i++) {
    let waysToWin = 0;
    let counter = 0;
    while (counter < times[i]) {
      if (counter * (times[i] - counter) > distances[i]) waysToWin++;
      counter++;
    }

    waysToWinArr.push(waysToWin);
  }

  return waysToWinArr.reduce((a, b) => a * b);
}

console.log(solve(readInput(import.meta.url)));
