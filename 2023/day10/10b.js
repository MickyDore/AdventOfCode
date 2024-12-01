import { readInput } from "../../inputUtils.js";

const validDirections = {
  S: ["EAST", "WEST", "SOUTH", "NORTH"],
  "-": ["EAST", "WEST"],
  7: ["SOUTH", "WEST"],
  F: ["SOUTH", "EAST"],
  J: ["NORTH", "WEST"],
  L: ["NORTH", "EAST"],
  "|": ["SOUTH", "NORTH"],
  ".": [],
};

// Check if two 2D array indexes are different
function pointsAreDifferent(point1, point2) {
  return point1[0] !== point2[0] || point1[1] !== point2[1];
}

// Find the index of the starting point 'S'
function findStartingPoint(rows) {
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].indexOf("S") >= 0) {
      return [i, rows[i].indexOf("S")];
    }
  }
}

// Given a point on the path, find the neighbouring valid pipe
function findNeighbours(invalidTile, position, tiles) {
  let pipePart = tiles[position[0]][position[1]];
  let neighbours = [];

  const directions = validDirections[pipePart];

  // check above
  if (directions.includes("NORTH") && position[0] > 0) {
    let pipeAbove = tiles[position[0] - 1][position[1]];
    if (validDirections[pipeAbove].includes("SOUTH")) {
      neighbours.push([position[0] - 1, position[1]]);
    }
  }

  // check below
  if (directions.includes("SOUTH") && position[0] < tiles.length - 1) {
    let pipeBelow = tiles[position[0] + 1][position[1]];
    if (validDirections[pipeBelow].includes("NORTH")) {
      neighbours.push([position[0] + 1, position[1]]);
    }
  }

  // check left
  if (directions.includes("WEST") && position[1] > 0) {
    let pipeLeft = tiles[position[0]][position[1] - 1];
    if (validDirections[pipeLeft].includes("EAST")) {
      neighbours.push([position[0], position[1] - 1]);
    }
  }

  // check right
  if (directions.includes("EAST") && position[1] < tiles[0].length - 1) {
    let pipeRight = tiles[position[0]][position[1] + 1];
    if (validDirections[pipeRight].includes("WEST")) {
      neighbours.push([position[0], position[1] + 1]);
    }
  }

  let filteredNeighbours = neighbours.filter((tile) =>
    pointsAreDifferent(tile, invalidTile)
  );
  return filteredNeighbours.length > 1
    ? filteredNeighbours
    : filteredNeighbours[0];
}

// use the shoelace formula to calculate the area of a polygon
// https://www.geeksforgeeks.org/area-of-a-polygon-with-given-n-ordered-vertices/
function getPolygonArea(X, Y, numPoints) {
  let area = 0;
  let j = numPoints - 1;

  for (let i = 0; i < numPoints; i++) {
    area += (X[j] + X[i]) * (Y[j] - Y[i]);
    j = i;
  }

  return Math.abs(area / 2);
}

export function solve(input) {
  const lines = input.split("\n");
  const tiles = lines.map((line) => line.split(""));

  const startingPoint = findStartingPoint(lines);

  let previousPoint = startingPoint;
  let neighbourPoint = findNeighbours(startingPoint, startingPoint, tiles)[0];
  let pathPoints = [neighbourPoint]; // track all points on the path

  // Get all points on the path
  while (pointsAreDifferent(startingPoint, neighbourPoint)) {
    let tempPoint = neighbourPoint;

    neighbourPoint = findNeighbours(previousPoint, neighbourPoint, tiles);
    previousPoint = tempPoint;

    pathPoints.push(neighbourPoint);
  }

  const xPoints = pathPoints.map((el) => el[0]);
  const yPoints = pathPoints.map((el) => el[1]);
  const polyArea = getPolygonArea(xPoints, yPoints, pathPoints.length);

  return polyArea - pathPoints.length / 2 + 1;
}

console.log(solve(readInput(import.meta.url)));
