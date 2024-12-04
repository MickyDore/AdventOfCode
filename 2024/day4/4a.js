import { readInput } from "../../inputUtils.js";

const word = ["X", "M", "A", "S"];
const movements = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

const cellIsInBounds = (x, y, grid) => {
  return 0 <= x && x < grid.length && 0 <= y && y < grid[0].length;
};

const findWords = (grid) => {
  let rowLength = grid.length;
  let columnLength = grid[0].length;

  let xmasFound = 0;

  for (let x = 0; x < rowLength; x++) {
    for (let y = 0; y < columnLength; y++) {
      if (grid[x][y] === "X") {
        for (const [dx, dy] of movements) {
          xmasFound += lookForXmas([x, y], dx, dy, grid);
        }
      } else {
        continue;
      }
    }
  }

  return xmasFound;
};

const lookForXmas = (pos, dx, dy, grid) => {
  const letters = [pos];
  let step = 0;
  let wordFound = 0;

  while (letters.length) {
    const letter = letters.pop();
    const [x, y] = letter;
    const char = grid[x][y];

    //if we've reached final letter, word is found
    if (char === word[word.length - 1] && step === word.length - 1) {
      wordFound = 1;
    }

    if (char === word[step]) {
      let newX = x + dx;
      let newY = y + dy;

      if (cellIsInBounds(newX, newY, grid)) {
        if (grid[newX][newY] === word[step + 1]) {
          letters.push([newX, newY]);
          step++;
        }
      }
    }
  }

  return wordFound;
};

export function solve(input) {
  const grid = input.split("\n").map((line) => line.split(""));

  return findWords(grid);
}

console.log(solve(readInput(import.meta.url)));
