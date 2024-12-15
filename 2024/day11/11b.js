import { readInput } from "../../inputUtils.js";

const cache = new Map();

const blinkForStone = (number, blinksLeft) => {
  if (cache.has(JSON.stringify([number, blinksLeft])))
    return cache.get(JSON.stringify([number, blinksLeft]));

  if (blinksLeft === 0) return 1;
  else {
    let total = 0;

    if (number === 0) return blinkForStone(1, blinksLeft - 1);
    else if (number.toString().length % 2 === 0) {
      let length = number.toString().length;

      total =
        blinkForStone(
          parseInt(number.toString().substring(0, length / 2), 10),
          blinksLeft - 1
        ) +
        blinkForStone(
          parseInt(number.toString().substring(length / 2, length), 10),
          blinksLeft - 1
        );
    } else {
      total = blinkForStone(number * 2024, blinksLeft - 1);
    }

    cache.set(JSON.stringify([number, blinksLeft]), total);
    return total;
  }
};

export function solve(input) {
  let line = input.split(" ").map(Number);

  const numberOfBlinks = 75;

  let total = 0;
  for (let i = 0; i < line.length; i++) {
    total += blinkForStone(line[i], numberOfBlinks);
  }

  return total;
}

console.log(solve(readInput(import.meta.url)));
