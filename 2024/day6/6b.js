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

const nextStepIsOutside = (pos, direction, rows, cols) => {
  const [stepX, stepY] = pos;
  const [x, y] = [
    stepX + movementMap[direction][0],
    stepY + movementMap[direction][1],
  ];

  return !(0 <= x && x < rows && 0 <= y && y < cols);
};

const checkForLoop = (start, grid) => {
  let rows = grid.length;
  let cols = grid[0].length;

  let direction = "NORTH";

  let step = start;

  let loopFound = 0;

  while (!nextStepIsOutside(step, direction, rows, cols) && !loopFound) {
    const [x, y] = step;
    const [x2, y2] = [
      x + movementMap[direction][0],
      y + movementMap[direction][1],
    ];
    const nextChar = grid[x2][y2];

    if (historyMap.has([x2, y2, direction].join(","))) {
      if (x2 !== start[0] && y2 !== start[1] && direction !== "NORTH") {
        console.log("loop found on", grid, [x2, y2, direction].join(","));
        loopFound = 1;
      }
    }

    if ([".", "^"].includes(nextChar)) {
      historyMap.add([x, y, direction].join(","));
      step = [x2, y2];
    }

    if (nextChar === "#") {
      direction = directionMap[direction];
    }
  }

  return loopFound;
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

  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
      if (r === startPos[0] && c === startPos[1]) continue;

      let gridClone = [...lines];
      const line = [...gridClone[r]];

      line[c] = "#";
      gridClone[r] = line.join("");

      loops += checkForLoop(startPos, gridClone);
      //   console.log(gridClone);
      //   console.log(checkForLoop(startPos, gridClone));
    }
  }

  console.log(loops);
}

console.log(solve(readInput(import.meta.url)));
