import { readInput } from "../../inputUtils.js";

const boxes = {};

function hashString(str) {
  let splitChar = str.indexOf("-") > 0 ? "-" : "=";
  let split = str.split(splitChar);
  let label = split[0];
  let focalLength = split[1];
  let boxNumber = 0;

  for (let i = 0; i < label.length; i++) {
    let hash = boxNumber + label.charCodeAt(i);
    hash *= 17;
    hash = hash % 256;
    boxNumber = hash;
  }

  if (splitChar === "=") {
    if (!boxes[boxNumber]) boxes[boxNumber] = new Map();
    boxes[boxNumber].set(label, focalLength);
  } else {
    if (!boxes[boxNumber]) return;
    if (boxes[boxNumber].has(label)) boxes[boxNumber].delete(label);
    if (boxes[boxNumber].size === 0) delete boxes[boxNumber];
  }
}

export function solve(input) {
  const words = input.split(",");

  let total = 0;

  for (let i = 0; i < words.length; i++) {
    hashString(words[i]);
  }

  for (const [key, map] of Object.entries(boxes)) {
    let index = 1;
    map.forEach((value) => {
      total += (1 + parseInt(key)) * parseInt(value) * index++;
    });
    index = 1;
  }

  return total;
}

console.log(solve(readInput(import.meta.url)));
