import { readInput } from "../../inputUtils.js";

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]; // UP, RIGHT, DOWN, LEFT

const cellIsInBounds = (x, y, grid) => {
  return 0 <= x && x < grid.length && 0 <= y && y < grid[0].length;
};

const getPlotCost = (grid) => {
  const history = new Set();

  const rows = grid.length;
  const cols = grid[0].length;

  let totalCost = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (history.has(JSON.stringify([i, j]))) continue;

      let area = 0;
      let edges = 0;

      const plants = [[i, j]];
      const letter = grid[i][j];

      console.log("The letter at ", i, j, "is ", letter);
      while (plants.length) {
        const plant = plants.pop();
        const [x, y] = plant;

        if (history.has(JSON.stringify([x, y]))) continue;

        area++;
        history.add(JSON.stringify([x, y]));

        for (const [dx, dy] of directions) {
          const newDx = x + dx;
          const newDy = y + dy;

          if (cellIsInBounds(newDx, newDy, grid)) {
            if (grid[newDx][newDy] !== letter) {
              edges++;
            } else {
              //   console.log(grid[newDx][newDy], "is in bounds");
              plants.push([newDx, newDy]);
            }
          } else {
            edges++;
          }
        }
      }

      console.log("area is", area, "and perimeter is ", edges);
      totalCost += area * edges;
      //   return area * edges;
    }
  }

  return totalCost;
};

export function solve(input) {
  const grid = input.split("\n").map((line) => line.split(""));

  let total = 0;

  return getPlotCost(grid);
}

console.log(solve(readInput(import.meta.url)));
