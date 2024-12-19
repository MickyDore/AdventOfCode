import { readInput } from "../../inputUtils.js";

const SECONDS = 100;
const HEIGHT = 103;
const WIDTH = 101;

const positions = [];
const quadrants = {
  1: [],
  2: [],
  3: [],
  4: [],
};

const getEndPosition = (start, velocity) => {
  const [x, y] = start;
  const [xVel, yVel] = velocity;

  let xPos = (x + ((xVel * SECONDS) % WIDTH)) % WIDTH;
  if (xPos < 0) xPos += WIDTH;

  let yPos = (y + ((yVel * SECONDS) % HEIGHT)) % HEIGHT;
  if (yPos < 0) yPos += HEIGHT;

  const position = [xPos, yPos];

  positions.push(position);
};

const getSafetyFactor = () => {
  const midX = Math.floor(WIDTH / 2);
  const midY = Math.floor(HEIGHT / 2);

  for (let i = 0; i < positions.length; i++) {
    const [x, y] = positions[i];

    if (x === midX || y === midY) continue;

    if (x < midX) {
      if (y < midY) quadrants[1].push(positions[i]);
      else quadrants[3].push(positions[i]);
    } else {
      if (y < midY) quadrants[2].push(positions[i]);
      else quadrants[4].push(positions[i]);
    }
  }
};

export function solve(input) {
  const lines = input.split("\n").map((line) => {
    const [p, v] = line.split(" ");

    const start = p.split("=")[1].split(",").map(Number);
    const velocity = v.split("=")[1].split(",").map(Number);

    return [start, velocity];
  });

  for (const [start, velocity] of lines) {
    getEndPosition(start, velocity);
  }

  getSafetyFactor();

  return Array.from(Object.values(quadrants)).reduce((a, b) => a * b.length, 1);
}

console.log(solve(readInput(import.meta.url)));
