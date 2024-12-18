import { readInput } from "../../inputUtils.js";

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let historyMap = new Set();

const nextStepisOutside = (pos, direction, rows, cols) => {
  const [stepX, stepY] = pos;
  const [dx, dy] = directions[direction];

  const [x, y] = [stepX + dx, stepY + dy];

  return !(0 <= x && x < rows && 0 <= y && y < cols);
};

const countSteps = (start, grid) => {
  let rows = grid.length;
  let cols = grid[0].length;

  let direction = 0;

  let step = start;

  historyMap.add(start.join(","));

  while (!nextStepisOutside(step, direction, rows, cols)) {
    const [x, y] = step;
    const [dx, dy] = directions[direction];

    const [x2, y2] = [x + dx, y + dy];
    const nextChar = grid[x2][y2];

    if ([".", "^"].includes(nextChar)) {
      historyMap.add([x, y].join(","));
      step = [x2, y2];
    }

    if (nextChar === "#") {
      direction = (direction + 1) % 4;
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
