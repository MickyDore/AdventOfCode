import { readInput } from "../../inputUtils.js";

function findVariations(map, arrangements) {
  if (map.length === 0) {
    return arrangements.length === 0 ? 1 : 0;
  }

  if (arrangements.length === 0) {
    return map.includes("#") ? 0 : 1;
  }

  let result = 0;

  if (map[0] === "." || map[0] === "?") {
    result += findVariations(map.slice(1), arrangements);
  }

  if (map[0] === "#" || map[0] === "?") {
    const enoughCharsLeft = arrangements[0] <= map.length;
    const hasNoDots = !map.slice(0, arrangements[0]).includes(".");
    const hasDotAtEnd =
      arrangements[0] === map.length || map[arrangements[0]] !== "#";

    if (enoughCharsLeft && hasNoDots && hasDotAtEnd) {
      result += findVariations(
        map.slice(arrangements[0] + 1),
        arrangements.slice(1)
      );
    }
  }

  return result;
}

export function solve(input) {
  const lines = input.split("\n");

  return lines
    .map((line) => {
      const map = line.split(" ")[0].split("");
      const arrangements = line.split(" ")[1].split(",").map(Number);

      return findVariations(map, arrangements);
    })
    .reduce((a, b) => a + b);
}

console.log(solve(readInput(import.meta.url)));
