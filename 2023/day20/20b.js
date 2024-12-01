import { readInput } from "../../inputUtils.js";

const root = "broadcaster";
const flipFlop = "%";
const conjunction = "&";

const targetModule = "rx"; // destination pulse
let target; // pulse before the destination

const modules = {}; // prettier format for all pulses
const cycles = {}; // object to track number of presses for target inputs to pulse HIGH

// parse the input and put the modules into an object
function sortModules(lines) {
  for (let i = 0; i < lines.length; i++) {
    const [input, output] = lines[i].split(" -> ");

    if (input === root) {
      modules[input] = {
        type: root,
        outputs: output.split(", "),
        on: false,
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

// for each conjunction module, find its inputs
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

// handle all pulses for a single button press cycle
function parsePulses(targetPulse, cycle) {
  const pulsesToCheck = [{ type: "LOW", from: "root", target: "broadcaster" }];

  while (pulsesToCheck.length) {
    const pulse = pulsesToCheck.shift();
    const module = modules[pulse.target];

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
      if (
        target === targetPulse &&
        Object.keys(modules[target].inputs).includes(pulse.from) &&
        pulse.type === "HIGH"
      ) {
        cycles[pulse.from] = cycle;
      }

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

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

export function solve(input) {
  const lines = input.split("\n");

  sortModules(lines);
  findConjunctionInputs();

  // find the module that pulses to the target module
  for (const [key, value] of Object.entries(modules)) {
    if (value.outputs.includes(targetModule)) {
      target = key;
    }
  }

  let counter = 0;
  while (Object.values(cycles).length !== 4) {
    parsePulses(target, ++counter);
  }

  return Object.values(cycles).reduce((a, b) => lcm(a, b), 1);
}

console.log(solve(readInput(import.meta.url)));
