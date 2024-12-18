import { readInput } from "../../inputUtils.js";

const movement = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const nextStepisOutside = (pos, direction, rows, cols) => {
  const [stepX, stepY] = pos;
  const [x, y] = [
    stepX + movement[direction][0],
    stepY + movement[direction][1],
  ];

  return !(0 <= x && x < rows && 0 <= y && y < cols);
};

const findLoop = (start, grid) => {
  let rows = grid.length;
  let cols = grid[0].length;

  let history = new Set();

  let direction = 0; // 0 -> North, 1 -> East, 2 -> South, 3 -> West

  let step = [...start, direction];
  let loopFound = false;

  while (true && !loopFound) {
    const [x, y, dir] = step;

    if (history.has(JSON.stringify([x, y, dir]))) return 1;
    history.add(JSON.stringify([x, y, direction]));

    const [x2, y2] = [x + movement[direction][0], y + movement[direction][1]];

    if (nextStepisOutside(step, direction, rows, cols)) return 0;

    const nextChar = grid[x2][y2];

    if (nextChar === "#") {
      direction = (direction + 1) % 4;
      step = [x, y, direction];
    } else step = [x2, y2, direction];
  }
};

export function solve(input) {
  const lines = input.split("\n").map((line) => line.split(""));

  let startPos = [];

  lines.forEach((line, index) => {
    const guardIndex = line.indexOf("^");
    if (guardIndex > 0) {
      startPos = [index, guardIndex];
    }
  });

  let loops = 0;

  // pretty gross brute force approach, convert each . tile to a # and see if a loop happens
  for (let r = 0; r < lines.length; r++) {
    for (let c = 0; c < lines[0].length; c++) {
      if (
        (r === startPos[0] && c === startPos[1]) ||
        ["#", "^"].includes(lines[r][c])
      )
        continue;

      lines[r][c] = "#";
      loops += findLoop(startPos, lines);
      lines[r][c] = ".";
    }
  }

  return loops;
}

console.log(solve(readInput(import.meta.url)));
