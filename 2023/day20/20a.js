import { readInput } from "../../inputUtils.js";

const root = "broadcaster";
const flipFlop = "%";
const conjunction = "&";

const pulseNums = {
  LOW: 0,
  HIGH: 0,
};
const modules = {};

function sortModules(lines) {
  for (let i = 0; i < lines.length; i++) {
    const [input, output] = lines[i].split(" -> ");

    if (input === root) {
      modules[input] = {
        type: root,
        outputs: output.split(", "),
        on: true,
      };
    } else if (input.charAt(0) === flipFlop) {
      modules[input.substr(1)] = {
        type: flipFlop,
        outputs: output.split(", "),
        on: false,
      };
    } else if (input.charAt(0) === conjunction) {
      modules[input.substr(1)] = {
        type: conjunction,
        outputs: output.split(", "),
        recent: "LOW",
        inputs: {},
      };
    }
  }
}

function findConjunctionInputs() {
  for (const [key, value] of Object.entries(modules)) {
    if (value.type === conjunction) {
      for (const [key2, value2] of Object.entries(modules)) {
        if (value2.outputs.includes(key)) {
          value.inputs[key2] = "LOW";
        }
      }
    }
  }
}

function parsePulses() {
  const pulsesToCheck = [{ type: "LOW", from: "root", target: "broadcaster" }];

  while (pulsesToCheck.length) {
    const pulse = pulsesToCheck.shift();
    const module = modules[pulse.target];
    pulseNums[pulse.type] = pulseNums[pulse.type] + 1; // increment frequency

    if (!module) continue;
    if (pulse.type === "HIGH" && module.type === flipFlop) continue;

    if (module.type === root) {
      for (let i = 0; i < module.outputs.length; i++) {
        let target = module.outputs[i];
        pulsesToCheck.push({ type: "LOW", from: pulse.target, target });
      }
    }

    if (module.type === flipFlop) {
      module.on = !module.on;

      for (let i = 0; i < module.outputs.length; i++) {
        let target = module.outputs[i];
        pulsesToCheck.push({
          type: module.on ? "HIGH" : "LOW",
          from: pulse.target,
          target,
        });
      }
    }

    if (module.type === conjunction) {
      module.inputs[pulse.from] = pulse.type;

      let strength = "HIGH";
      if (Object.values(module.inputs).every((pulse) => pulse === "HIGH"))
        strength = "LOW";

      for (let i = 0; i < module.outputs.length; i++) {
        let target = module.outputs[i];
        pulsesToCheck.push({ type: strength, from: pulse.target, target });
      }
    }
  }
}
export function solve(input) {
  const lines = input.split("\n");

  sortModules(lines);
  findConjunctionInputs();

  const CYCLES = 1000;

  for (let i = 0; i < CYCLES; i++) {
    parsePulses();
  }

  return pulseNums["LOW"] * pulseNums["HIGH"];
}

console.log(solve(readInput(import.meta.url)));
