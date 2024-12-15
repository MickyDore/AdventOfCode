import { readInput } from "../../inputUtils.js";

const blink = (line) => {
  let newLine = [];

  for (let i = 0; i < line.length; i++) {
    if (line[i] === 0) newLine.push(1);
    else if (line[i].toString().length % 2 === 0) {
      let length = line[i].toString().length;
      newLine.push(parseInt(line[i].toString().substring(0, length / 2), 10));
      newLine.push(
        parseInt(line[i].toString().substring(length / 2, length), 10)
      );
    } else newLine.push(parseInt(line[i], 10) * 2024);
  }

  return newLine;
};

export function solve(input) {
  let line = input.split(" ").map(Number);

  const numberOfBlinks = 25;

  for (let i = 0; i < numberOfBlinks; i++) {
    line = blink(line);
  }

  return line.length;
}

console.log(solve(readInput(import.meta.url)));
