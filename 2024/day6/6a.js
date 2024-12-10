import { readInput } from "../../inputUtils.js";

const directionMap = {
  NORTH: "EAST",
  EAST: "SOUTH",
  SOUTH: "WEST",
  WEST: "NORTH",
};

const movementMap = {
  NORTH: [-1, 0],
  EAST: [0, 1],
  SOUTH: [1, 0],
  WEST: [0, -1],
};

let historyMap = new Set();

const nextStepisOutside = (pos, direction, rows, cols) => {
  const [stepX, stepY] = pos;
  const [x, y] = [
    stepX + movementMap[direction][0],
    stepY + movementMap[direction][1],
  ];

  return !(0 <= x && x < rows && 0 <= y && y < cols);
};

const countSteps = (start, grid) => {
  let rows = grid.length;
  let cols = grid[0].length;

  let direction = "NORTH";

  let step = start;

  historyMap.add(start.join(","));

  while (!nextStepisOutside(step, direction, rows, cols)) {
    const [x, y] = step;
    const [x2, y2] = [
      x + movementMap[direction][0],
      y + movementMap[direction][1],
    ];
    const nextChar = grid[x2][y2];

    if ([".", "^"].includes(nextChar)) {
      historyMap.add([x, y].join(","));
      step = [x2, y2];
    }

    if (nextChar === "#") {
      direction = directionMap[direction];
    }
  }
};

export function solve(input) {
  const lines = input.split("\n");

  let startPos = [];

  lines.forEach((line, index) => {
    const guardIndex = line.split("").indexOf("^");
    if (guardIndex > 0) {
      startPos = [index, guardIndex];
    }
  });

  countSteps(startPos, lines);

  console.log(historyMap.size + 1);
}

console.log(solve(readInput(import.meta.url)));
