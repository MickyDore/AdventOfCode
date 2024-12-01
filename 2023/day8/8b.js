import { readInput } from "../../inputUtils.js";

function endsWithChar(str, char) {
  return str.charAt(str.length - 1) === char;
}

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

export function solve(input) {
  const lines = input.split("\n\n");

  const instructions = lines[0];
  const maps = lines[1];

  const startingNodes = [];

  const map = maps.split("\n").reduce((a, v) => {
    const key = v.split(" =")[0];
    const options = v.split("= ")[1];
    const value = [...options.matchAll(/\w{3}/g)].map((words) => words[0]);
    if (endsWithChar(key, "A")) startingNodes.push(key);

    return { ...a, [key]: value };
  }, {});

  let endingNodeSteps = [];

  for (let i = 0; i < startingNodes.length; i++) {
    let steps = 0;
    let destination = startingNodes[i];

    while (!endsWithChar(destination, "Z")) {
      let direction =
        instructions.charAt(steps % instructions.length) === "L" ? 0 : 1;
      destination = map[destination][direction];
      steps++;
    }
    endingNodeSteps.push(steps);
  }

  return endingNodeSteps.reduce((a, b) => lcm(a, b), 1);
}

console.log(solve(readInput(import.meta.url)));
