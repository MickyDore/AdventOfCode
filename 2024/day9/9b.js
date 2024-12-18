import { readInput } from "../../inputUtils.js";

const gaps = [];
const idsMap = {};

let id = 0;

const generateBlocks = (line) => {
  let blocks = [];

  for (let i = 0; i < line.length; i++) {
    if (i % 2 === 0) {
      idsMap[id] = [blocks.length, line[i]];

      for (let j = 0; j < line[i]; j++) blocks.push(id);
      id++;
    } else {
      gaps.push([blocks.length, line[i]]);

      for (let j = 0; j < line[i]; j++) blocks.push(".");
    }
  }

  return blocks;
};

const moveBlocks = (blocks) => {
  id -= 1;

  for (let i = id; i >= 0; i--) {
    const [idStart, idLength] = idsMap[i];

    for (let j = 0; j < gaps.length; j++) {
      const [start, size] = gaps[j];

      if (idStart < start) continue;
      if (size >= idLength) {
        if (size === idLength) {
          gaps.splice(j, 1);
          for (let k = start; k < start + idLength; k++) {
            blocks[k] = i;
          }

          for (let l = idStart; l < idStart + idLength; l++) {
            blocks[l] = ".";
          }
        } else {
          for (let k = start; k < start + idLength; k++) {
            blocks[k] = i;
          }

          for (let l = idStart; l < idStart + idLength; l++) {
            blocks[l] = ".";
          }

          gaps[j] = [start + idLength, size - idLength];
        }

        break;
      }
    }
  }

  return blocks;
};

export function solve(input) {
  const line = input;

  let blocks = generateBlocks(line.split("").map(Number));
  blocks = moveBlocks(blocks);

  return blocks.reduce((acc, val, index) => {
    if (val === ".") return acc;
    return acc + val * index;
  }, 0);
}

console.log(solve(readInput(import.meta.url)));
