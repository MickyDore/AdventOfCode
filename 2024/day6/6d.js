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

const findLoop = (start, grid) => {
  let rows = grid.length;
  let cols = grid[0].length;

  let direction = 0; // 0 -> North, 1 -> East, 2 -> South, 3 -> West

  let step = start;
  let loopFound = false;

  while (true && !loopFound) {
    const [x, y] = step;

    const [x2, y2] = [x + movement[direction][0], y + movement[direction][1]];
    history.add([x, y, direction].join(","));

    if (nextStepisOutside(step, direction, rows, cols)) return 0;

    const nextChar = grid[x2][y2];

    if (nextChar === "#") direction = (direction + 1) % 4;
    else step = [x2, y2];

    if (history.has([x, y, direction].join(","))) {
      console.log("found loop at", x, y, direction);
      return 1;
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

  let loops = 0;
  for (let r = 0; r < lines.length; r++) {
    for (let c = 0; c < lines[0].length; c++) {
      if ((r === startPos[0] && c === startPos[1]) || lines[r][c] !== ".")
        continue;

      lines[r].char[c] = "#";
      loops += findLoop(startPos, lines);
      lines[r][c] = ".";
      //   console.log(gridClone);
      //   console.log(checkForLoop(startPos, gridClone));
    }
  }

  //   findLoop(startPos, lines);

  return history.size;
}

console.log(solve(readInput(import.meta.url)));
