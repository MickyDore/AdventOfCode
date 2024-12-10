import { readInput } from "../../inputUtils.js";

const movement = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let history = new Set();

const nextStepisOutside = (pos, direction, rows, cols) => {
  const [stepX, stepY] = pos;
  const [x, y] = [
    stepX + movement[direction][0],
    stepY + movement[direction][1],
  ];

  return !(0 <= x && x < rows && 0 <= y && y < cols);
};

const countSteps = (start, grid) => {
  let rows = grid.length;
  let cols = grid[0].length;

  let direction = 0; // 0 -> North, 1 -> East, 2 -> South, 3 -> West

  let step = start;

  while (true) {
    const [x, y] = step;
    const [x2, y2] = [x + movement[direction][0], y + movement[direction][1]];
    history.add([x, y].join(","));

    if (nextStepisOutside(step, direction, rows, cols)) break;

    const nextChar = grid[x2][y2];

    if (nextChar === "#") direction = (direction + 1) % 4;
    else step = [x2, y2];
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

  return history.size;
}

console.log(solve(readInput(import.meta.url)));
