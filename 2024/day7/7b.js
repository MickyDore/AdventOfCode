import { readInput } from "../../inputUtils.js";

const canGetTarget = (target, values) => {
  if (values.length === 1) return target === values[0];

  if (
    target % values[values.length - 1] === 0 &&
    canGetTarget(target / values[values.length - 1], values.slice(0, -1))
  )
    return true;
  if (
    target > values[values.length - 1] &&
    canGetTarget(target - values[values.length - 1], values.slice(0, -1))
  )
    return true;

  const targetString = target.toString();
  const valueString = values[values.length - 1].toString();

  if (
    targetString.length > valueString.length &&
    targetString.endsWith(valueString) &&
    canGetTarget(
      parseInt(
        targetString.substring(0, targetString.length - valueString.length)
      ),
      values.slice(0, -1)
    )
  )
    return true;

  return false;
};

export function solve(input) {
  const lines = input.split("\n");

  let count = 0;
  lines.forEach((line) => {
    const [test, values] = line.split(": ");
    if (canGetTarget(parseInt(test), values.split(" ").map(Number)))
      count += parseInt(test);
  });

  return count;
}

console.log(solve(readInput(import.meta.url)));
