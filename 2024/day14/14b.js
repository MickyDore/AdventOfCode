import { readInput } from "../../inputUtils.js";

const HEIGHT = 103;
const WIDTH = 101;

let positions = [];

const getEndPosition = (start, velocity, seconds) => {
  const [x, y] = start;
  const [xVel, yVel] = velocity;

  let xPos = (x + ((xVel * seconds) % WIDTH)) % WIDTH;
  if (xPos < 0) xPos += WIDTH;

  let yPos = (y + ((yVel * seconds) % HEIGHT)) % HEIGHT;
  if (yPos < 0) yPos += HEIGHT;

  const position = [xPos, yPos];

  positions.push(position);
};

export function solve(input) {
  const lines = input.split("\n").map((line) => {
    const [p, v] = line.split(" ");

    const start = p.split("=")[1].split(",").map(Number);
    const velocity = v.split("=")[1].split(",").map(Number);

    return [start, velocity];
  });

  // I had no idea what I was looking for here.. I made an assumption that maybe if all robots were in unique positions then
  // they would be in the shape of a tree, and it turned out to work
  for (let i = 1; i < 100_000; i++) {
    for (const [start, velocity] of lines) {
      getEndPosition(start, velocity, i);
    }

    const positionSet = new Set(positions.map((pos) => JSON.stringify(pos)));

    if (positions.length === positionSet.size) {
      return i;
    } else {
      positions = [];
    }
  }
}

console.log(solve(readInput(import.meta.url)));
