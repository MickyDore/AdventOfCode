import { readInput } from "../../inputUtils.js";

const generateBlocks = (line) => {
  let id = 0;
  let blocks = [];

  for (let i = 0; i < line.length; i++) {
    if (i % 2 === 0) {
      for (let j = 0; j < line[i]; j++) blocks.push(id);
      id++;
    } else {
      for (let j = 0; j < line[i]; j++) blocks.push(".");
    }
  }

  return blocks;
};

const moveBlocks = (blocks) => {
  for (let i = blocks.length - 1; i > 0; i--) {
    let indexOfDot = blocks.indexOf(".");

    if (indexOfDot < i) {
      let temp = blocks[indexOfDot];
      blocks[indexOfDot] = blocks[i];
      blocks[i] = temp;
    }
  }

  return blocks;
};

export function solve(input) {
  const line = input;

  let blocks = generateBlocks(line.split(""));
  blocks = moveBlocks(blocks);

  return blocks.reduce((acc, val, index) => {
    if (val === ".") return acc;
    return acc + val * index;
  }, 0);
}

console.log(solve(readInput(import.meta.url)));
