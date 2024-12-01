import { readInput } from "../../inputUtils.js";

// map for converting directions, key = from, value = to
const directionMap = {
  WEST: "EAST",
  EAST: "WEST",
  NORTH: "SOUTH",
  SOUTH: "NORTH",
};

// get tile in direction from current tile, checking for edge cases
function getNextTile(grid, tile, direction) {
  const rows = grid.length;
  const cols = grid[0].length;

  if (direction === "EAST") {
    if (tile[1] >= cols - 1) return false;
    return [tile[0], tile[1] + 1];
  }
  if (direction === "WEST") {
    if (tile[1] <= 0) return false;
    return [tile[0], tile[1] - 1];
  }
  if (direction === "NORTH") {
    if (tile[0] <= 0) return false;
    return [tile[0] - 1, tile[1]];
  }
  if (direction === "SOUTH") {
    if (tile[0] >= rows - 1) return false;
    return [tile[0] + 1, tile[1]];
  }
}

function parseGrid(grid) {
  const hitTiles = new Map();
  const pathTiles = new Map();
  const nextMoves = [{ pos: [0, 0], from: "WEST" }];

  while (nextMoves.length) {
    nextMoves.forEach((move, index) => {
      hitTiles.set(move.pos.join("_"), true);

      let mapKey = `${move.pos.join("_")}_${move.from}`;
      if (pathTiles.get(mapKey)) {
        nextMoves.splice(index, 1);
        return;
      }

      const direction = directionMap[move.from];
      let tile = grid[move.pos[0]][move.pos[1]];

      if (tile === ".") {
        let nextTile = getNextTile(grid, move.pos, direction);
        if (nextTile) nextMoves.push({ pos: nextTile, from: move.from });
      }

      if (tile === "/") {
        if (move.from === "WEST") {
          let nextTile = getNextTile(grid, move.pos, "NORTH");
          if (nextTile) nextMoves.push({ pos: nextTile, from: "SOUTH" });
        }
        if (move.from === "EAST") {
          let nextTile = getNextTile(grid, move.pos, "SOUTH");
          if (nextTile) nextMoves.push({ pos: nextTile, from: "NORTH" });
        }
        if (move.from === "NORTH") {
          let nextTile = getNextTile(grid, move.pos, "WEST");
          if (nextTile) nextMoves.push({ pos: nextTile, from: "EAST" });
        }
        if (move.from === "SOUTH") {
          let nextTile = getNextTile(grid, move.pos, "EAST");
          if (nextTile) nextMoves.push({ pos: nextTile, from: "WEST" });
        }
      }

      if (tile === "\\") {
        if (move.from === "WEST") {
          let nextTile = getNextTile(grid, move.pos, "SOUTH");
          if (nextTile) nextMoves.push({ pos: nextTile, from: "NORTH" });
        }
        if (move.from === "EAST") {
          let nextTile = getNextTile(grid, move.pos, "NORTH");
          if (nextTile) nextMoves.push({ pos: nextTile, from: "SOUTH" });
        }
        if (move.from === "NORTH") {
          let nextTile = getNextTile(grid, move.pos, "EAST");
          if (nextTile) nextMoves.push({ pos: nextTile, from: "WEST" });
        }
        if (move.from === "SOUTH") {
          let nextTile = getNextTile(grid, move.pos, "WEST");
          if (nextTile) nextMoves.push({ pos: nextTile, from: "EAST" });
        }
      }

      if (tile === "|") {
        if (move.from === "WEST" || move.from === "EAST") {
          let firstTile = getNextTile(grid, move.pos, "NORTH");
          let secondTile = getNextTile(grid, move.pos, "SOUTH");
          if (firstTile) nextMoves.push({ pos: firstTile, from: "SOUTH" });
          if (secondTile) nextMoves.push({ pos: secondTile, from: "NORTH" });
        }
        if (move.from === "NORTH" || move.from === "SOUTH") {
          let nextTile = getNextTile(grid, move.pos, direction);
          if (nextTile) nextMoves.push({ pos: nextTile, from: move.from });
        }
      }

      if (tile === "-") {
        if (move.from === "WEST" || move.from === "EAST") {
          let nextTile = getNextTile(grid, move.pos, direction);
          if (nextTile) nextMoves.push({ pos: nextTile, from: move.from });
        }

        if (move.from === "NORTH" || move.from === "SOUTH") {
          let firstTile = getNextTile(grid, move.pos, "WEST");
          let secondTile = getNextTile(grid, move.pos, "EAST");
          if (firstTile) nextMoves.push({ pos: firstTile, from: "EAST" });
          if (secondTile) nextMoves.push({ pos: secondTile, from: "WEST" });
        }
      }

      pathTiles.set(mapKey, true);
      nextMoves.splice(index, 1);
    });
  }

  return hitTiles.size;
}

export function solve(input) {
  const lines = input.split("\n");
  const grid = lines.map((line) => line.split(""));

  return parseGrid(grid);
}

console.log(solve(readInput(import.meta.url)));
