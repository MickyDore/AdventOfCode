import { readInput } from "../../inputUtils.js";

function overlaps(a, b) {
  return (
    Math.max(a[0], b[0]) <= Math.min(a[3], b[3]) &&
    Math.max(a[1], b[1]) <= Math.min(a[4], b[4])
  );
}

function cascadeTower(bricks) {
  for (let i = 0; i < bricks.length; i++) {
    let maxZ = 1;

    for (let j = 0; j < i; j++) {
      if (bricks[i] === bricks[j]) continue;
      if (overlaps(bricks[i], bricks[j])) {
        maxZ = Math.max(maxZ, bricks[j][5] + 1);
      }

      bricks[i][5] -= bricks[i][2] - maxZ;
      bricks[i][2] = maxZ;
    }
  }
}

export function solve(input) {
  const lines = input.split("\n");
  const bricks = lines
    .map((line) => line.replace("~", ",").split(",").map(Number))
    .sort((a, b) => a[2] - b[2]);

  cascadeTower(bricks);

  bricks.sort((a, b) => a[2] - b[2]);

  const aSupportsB = {};
  const bSupportedByA = {};

  for (let i = 0; i < bricks.length; i++) {
    aSupportsB[i] = new Set();
    bSupportedByA[i] = new Set();
  }

  for (let i = 0; i < bricks.length; i++) {
    for (let j = i + 1; j < bricks.length; j++) {
      if (overlaps(bricks[i], bricks[j]) && bricks[i][5] + 1 === bricks[j][2]) {
        aSupportsB[i].add(j);
        bSupportedByA[j].add(i);
      }
    }
  }

  let total = new Set();

  for (let i = 0; i < bricks.length; i++) {
    let supports = [...aSupportsB[i]];

    let canDisintegrate = true;
    for (let j = 0; j < supports.length; j++) {
      if (bSupportedByA[supports[j]].size < 2) {
        canDisintegrate = false;
        break;
      }
    }

    if (canDisintegrate) total.add(i);
  }

  return total.size;
}

console.log(solve(readInput(import.meta.url)));
