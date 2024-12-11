import { readInput } from "../../inputUtils.js";

const locations = {};
const antinodes = new Set();

const arraysAreEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) continue;
    return false;
  }

  return true;
};

const cellIsInBounds = (x, y, grid) => {
  return 0 <= x && x < grid.length && 0 <= y && y < grid[0].length;
};

const findAntinodes = (values, grid) => {
  for (let i = 0; i < values.length - 1; i++) {
    for (let j = 1 + i; j < values.length; j++) {
      let [x1, y1] = values[i];
      let [x2, y2] = values[j];

      const [width, height] = [x2 - x1, y2 - y1];

      let positions = [];

      if (y1 === y2) {
        positions.push([x1, y1 - height], [x2, y2 + height]);
      } else if (x1 === x2) {
        positions.push([x1 - width, y1], [x2 + width, y2]);
      } else {
        positions.push([x1 - width, y1 - height], [x2 + width, y2 + height]);
      }

      positions.forEach((pos) => {
        const [x, y] = pos;

        if (
          cellIsInBounds(x, y, grid) &&
          !arraysAreEqual([x, y], [x1, y1]) &&
          !arraysAreEqual([x, y], [x2, y2])
        ) {
          antinodes.add([x, y].join(","));
        }
      });
    }
  }

  return antinodes;
};

export function solve(input) {
  const grid = input.split("\n").map((line) => line.split(""));

  const rows = grid.length;
  const cols = grid[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== ".") {
        if (locations[grid[r][c]]) locations[grid[r][c]].push([r, c]);
        else locations[grid[r][c]] = [[r, c]];
      }
    }
  }

  Object.entries(locations).forEach(([key, values]) => {
    findAntinodes(values, grid);
  });

  return antinodes.size;
}

console.log(solve(readInput(import.meta.url)));
