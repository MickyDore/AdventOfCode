import { readInput } from "../../inputUtils.js";

const word = ["M", "S"];

const cornersHaveMS = (arr) => {
  return word.every((char) => arr.includes(char));
};

const cellIsNotOnEdge = (x, y, grid) => {
  return 0 < x && x < grid.length - 1 && 0 < y && y < grid[0].length - 1;
};

const findXMasCount = (grid) => {
  let rowLength = grid.length;
  let columnLength = grid[0].length;

  let xmasFound = 0;

  for (let x = 0; x < rowLength; x++) {
    for (let y = 0; y < columnLength; y++) {
      if (grid[x][y] === "A" && cellIsNotOnEdge(x, y, grid)) {
        const topLeftToBottomRight = [grid[x - 1][y - 1], grid[x + 1][y + 1]];
        const bottomLeftToTopRight = [grid[x - 1][y + 1], grid[x + 1][y - 1]];

        if (
          cornersHaveMS(topLeftToBottomRight) &&
          cornersHaveMS(bottomLeftToTopRight)
        )
          xmasFound++;
      }
    }
  }

  return xmasFound;
};

export function solve(input) {
  const grid = input.split("\n").map((line) => line.split(""));

  return findXMasCount(grid);
}

console.log(solve(readInput(import.meta.url)));
