import { readInput } from "../../inputUtils.js";

const directions = [
  [0, 1], // RIGHT
  [0, -1], // LEFT
  [1, 0], // DOWN
  [-1, 0], // UP
];

const cellIsInBounds = (x, y, grid) => {
  return 0 <= x && x < grid.length && 0 <= y && y < grid[0].length;
};

const findTrails = (trailheads, grid) => {
  let totalTrails = 0;

  for (let i = 0; i < trailheads.length; i++) {
    let trailEnds = 0;

    const history = new Set();
    const [x, y] = trailheads[i];
    const steps = [[x, y, parseInt(grid[x][y])]];

    while (steps.length) {
      const step = steps.pop();
      const [x, y, height] = step;

      history.add(JSON.stringify(step));

      if (grid[x][y] === "9") {
        trailEnds++;
        continue;
      }

      for (const [dx, dy] of directions) {
        const xDx = x + dx;
        const yDy = y + dy;

        if (cellIsInBounds(xDx, yDy, grid)) {
          if (grid[xDx][yDy] === ".") continue;

          if (height === parseInt(grid[xDx][yDy] - 1)) {
            steps.push([xDx, yDy, parseInt(grid[xDx][yDy])]);
          }
        }
      }
    }

    totalTrails += trailEnds;
  }

  return totalTrails;
};

export function solve(input) {
  const grid = input.split("\n").map((line) => line.split(""));

  const rows = grid.length;
  const cols = grid[0].length;

  const trailheads = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === "0") trailheads.push([i, j]);
    }
  }

  return findTrails(trailheads, grid);
}

console.log(solve(readInput(import.meta.url)));
