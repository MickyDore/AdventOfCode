import { readInput } from "../../inputUtils.js";

const isReportSafe = (report) => {
  let direction = Math.sign(report[1] - report[0]);

  for (let i = 0; i < report.length - 1; i++) {
    const change = report[i + 1] - report[i];
    const isValid =
      Math.sign(change) == direction &&
      Math.abs(change) <= 3 &&
      Math.abs(change) > 0;

    if (isValid) continue;
    else return 0;
  }

  return 1;
};

export function solve(input) {
  const lines = input.split("\n");
  const reports = lines.map((line) => line.split(" ").map(Number));

  return reports.reduce((a, b) => a + isReportSafe(b), 0);
}

console.log(solve(readInput(import.meta.url)));
