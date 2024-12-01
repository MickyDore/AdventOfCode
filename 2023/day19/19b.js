import { readInput } from "../../inputUtils.js";

const workflows = {};

function calculateCombinations(quantities) {
  let sum = 1;

  for (const [key, value] of Object.entries(quantities)) {
    sum *= value.max - value.min + 1;
  }

  return sum;
}

export function solve(input) {
  const split = input.split("\n\n");
  const workflowsBlock = split[0].split("\n");

  // parse all workflows and put into a map to make life easier
  for (let i = 0; i < workflowsBlock.length; i++) {
    const bracket = workflowsBlock[i].indexOf("{");
    workflows[workflowsBlock[i].substr(0, bracket)] = workflowsBlock[i].substr(
      bracket + 1,
      workflowsBlock[i].length - bracket - 2
    );
  }

  const min = 1;
  const max = 4000;

  // Track the workflow we're in and the ratings left
  const firstBlock = {
    code: "in",
    quantities: {
      x: { min, max },
      m: { min, max },
      a: { min, max },
      s: { min, max },
    },
  };

  let total = 0;
  const blocksToCheck = [firstBlock];

  workflowLoop: while (blocksToCheck.length) {
    let nextBlock = blocksToCheck.pop();
    const quantities = nextBlock.quantities;

    if (nextBlock.code === "R") continue;
    if (nextBlock.code === "A") {
      total += calculateCombinations(quantities);
      continue;
    }

    let flow = workflows[nextBlock.code];

    // while there is still an expression left
    while (flow.indexOf(",")) {
      let commaIndexes = [...flow.matchAll(/,/g)].map((match) => match.index);

      // if this is the last expression
      let expression =
        commaIndexes.length === 1 ? flow : flow.substr(0, flow.indexOf(","));

      let item = expression.charAt(0); // rating symbol (x, m, a, s)
      let operator = expression.charAt(1); // operator (>, <)
      let value = parseInt(expression.substr(2, expression.indexOf(":") - 2)); // rating value (1 - 4000)
      let endpoints = expression.split(":")[1].split(","); // possible routes (1 or 2)

      if (operator === ">") {
        if (value < quantities[item].max) {
          let newBlock = JSON.parse(JSON.stringify(nextBlock));
          newBlock.code = endpoints[0];
          newBlock.quantities[item].min = value + 1;
          blocksToCheck.push(newBlock);

          // if we're at the end of workflow and there's a second root, go there
          if (endpoints.length > 1) {
            let newBlock = JSON.parse(JSON.stringify(nextBlock));
            newBlock.code = endpoints[1];
            newBlock.quantities[item].max = value;
            blocksToCheck.push(newBlock);
          }
          // otherwise, update the quantities and continue down the workflow
          else {
            nextBlock.quantities[item].max = value;
            flow = flow.substr(commaIndexes.shift() + 1);
            continue;
          }

          continue workflowLoop;
        } else {
          if (endpoints.length > 1) {
            nextBlock.code = endpoints[1];
            nextBlock.quantities[item].min = value - 1;
            blocksToCheck.push({ ...nextBlock });

            continue workflowLoop;
          } else {
            flow = flow.substr(commaIndexes.shift() + 1);
            continue;
          }
        }
      } else if (operator === "<") {
        if (quantities[item].min < value) {
          let newBlock = JSON.parse(JSON.stringify(nextBlock));
          newBlock.code = endpoints[0];
          newBlock.quantities[item].max = value - 1;
          blocksToCheck.push(newBlock);

          // if we're at the end of workflow and there's a second root, go there
          if (endpoints.length > 1) {
            let newBlock = JSON.parse(JSON.stringify(nextBlock));
            newBlock.code = endpoints[1];
            newBlock.quantities[item].min = value;
            blocksToCheck.push(newBlock);
          }
          // otherwise, update the quantities and continue down the workflow
          else {
            if (quantities[item].max > value) {
              nextBlock.quantities[item].min = value;
              flow = flow.substr(commaIndexes.shift() + 1);
              continue;
            }
          }

          continue workflowLoop;
        } else {
          if (endpoints.length > 1) {
            nextBlock.code = endpoints[1];
            nextBlock.quantities[item].min =
              nextBlock.quantities[item].min + value - 1;
            blocksToCheck.push({ ...nextBlock });

            continue workflowLoop;
          } else {
            flow = flow.substr(commaIndexes.shift() + 1);
            continue;
          }
        }
      }
    }
  }

  return total;
}

console.log(solve(readInput(import.meta.url)));
