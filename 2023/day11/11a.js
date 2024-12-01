import { readInput } from "../../inputUtils.js";

function expandRows(tiles) {
  for (let i = 0; i < tiles.length; i++) {
    if (!tiles[i].includes("#")) {
      let newRow = Array.from(".".repeat(tiles[i].length));
      tiles.splice(i, 0, newRow);
      i += 1;
    }
  }
}

function expandColumns(tiles) {
  for (let i = 0; i < tiles[0].length; i++) {
    let map = tiles.map((row) => row[i]).filter((symbol) => symbol !== ".");
    if (!map.length) {
      for (let j = 0; j < tiles.length; j++) {
        tiles[j].splice(i, 0, ".");
      }
      i += 1;
    }
  }
}

export function solve(input) {
  const lines = input.split("\n");
  const tiles = lines.map((line) => line.split(""));

  expandRows(tiles);
  expandColumns(tiles);

  let hashLocations = [];

  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[i].length; j++) {
      if (tiles[i][j] === "#") hashLocations.push([i, j]);
    }
  }

  let sum = 0;

  for (let i = 0; i < hashLocations.length - 1; i++) {
    for (let j = i + 1; j < hashLocations.length; j++) {
      sum +=
        Math.abs(hashLocations[i][1] - hashLocations[j][1]) +
        Math.abs(hashLocations[i][0] - hashLocations[j][0]);
    }
  }

  return sum;
}

console.log(solve(readInput(import.meta.url)));
