import { readInput } from "../../inputUtils.js";

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]; // UP, RIGHT, DOWN, LEFT

const edgeMap = {};

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
      let area = 0;
      let edges = 0;

      const plants = [[i, j, 0, 0]]; // x, y, dx, dy
      const letter = grid[i][j];

      while (plants.length) {
        const plant = plants.pop();
        const [x, y] = plant;

        if (history.has(JSON.stringify([x, y]))) continue;
        history.add(JSON.stringify([x, y]));

        area++;

        for (const [dx2, dy2] of directions) {
          const newX = x + dx2;
          const newY = y + dy2;

          const edgeX = (x + newX) / 2;
          const edgeY = (y + newY) / 2;

          if (!edgeMap[letter]) {
            edgeMap[letter] = new Set();
            edgeMap[letter].add(JSON.stringify([edgeX, edgeY, dx2, dy2]));
          } else edgeMap[letter].add(JSON.stringify([edgeX, edgeY, dx2, dy2]));

          edges++;
          if (cellIsInBounds(newX, newY, grid)) {
            if (grid[newX][newY] === letter) {
              edgeMap[letter].delete(JSON.stringify([edgeX, edgeY, dx2, dy2]));
              edges--;
              plants.push([newX, newY]);
            }
          }
        }
      }

      for (let i = 0; i < edgeMap[letter].size; i++) {
        let edge = JSON.parse(Array.from(edgeMap[letter])[i]);
        const [eX, eY, dx, dy] = edge;

        for (let j = 0; j < edgeMap[letter].size; j++) {
          let neighbourEdge = JSON.parse(Array.from(edgeMap[letter])[j]);
          const [neX, neY, ndX, ndY] = neighbourEdge;

          if (
            (Math.abs(neX - eX) === 1 &&
              eY === neY &&
              dx === ndX &&
              dy === ndY) ||
            (Math.abs(neY - eY) === 1 && eX === neX && dx === ndX && dy === ndY)
          ) {
            edges--;
            continue;
          }
        }

        edgeMap[letter].delete(JSON.stringify([eX, eY, dx, dy]));
        i--;
      }

      totalCost += area * edges;
    }
  }

  return totalCost;
};

export function solve(input) {
  const grid = input.split("\n").map((line) => line.split(""));

  return getPlotCost(grid);
}

console.log(solve(readInput(import.meta.url)));
