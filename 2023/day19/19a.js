import { readInput } from '../inputUtils.js'

const workflows = {}

function splitParts(parts) {
    let stripped = parts.substr(1, parts.length-2)
    let split = stripped.split(',')
    let obj = {}

    for (let i = 0; i < split.length; i++) {
        const [key, value] = split[i].split('=')
        obj[key] = parseInt(value)
    }

    return obj
}

export function solve(input) {
    let total = 0
    const split = input.split('\n\n')
    const workflowsBlock = split[0].split('\n')
    const partsBlock = split[1].split('\n')

    for (let i = 0; i < workflowsBlock.length; i++) {
        const bracket = workflowsBlock[i].indexOf('{')
        workflows[workflowsBlock[i].substr(0,bracket)] = workflowsBlock[i].substr(bracket+1, workflowsBlock[i].length-bracket-2)
    }

    const firstBlock = 'in'

    for (let i = 0; i < partsBlock.length; i++) {
        let nextBlock = firstBlock
        const obj = splitParts(partsBlock[i])

        workflowLoop: while (!['R', 'A'].includes(nextBlock)) {
            let flow = workflows[nextBlock]

            while (flow.indexOf(',')) {
                let commaIndexes = [...flow.matchAll(/,/g)].map(match => match.index)

                // if this is the last expression
                let expression = commaIndexes.length === 1 ? flow : flow.substr(0, flow.indexOf(','))

                let item = expression.charAt(0)
                let operator = expression.charAt(1)
                let value = expression.substr(2, expression.indexOf(':') - 2)
                let endpoints = expression.split(':')[1].split(',')

                if (operator === '>') {
                    if (obj[item] > parseInt(value)) {
                        nextBlock = endpoints[0]
                        continue workflowLoop
                    } else {
                        if (endpoints.length > 1) {
                            nextBlock = endpoints[1]
                            continue workflowLoop
                        } else {
                            flow = flow.substr(commaIndexes.shift()+1)
                            continue
                        }
                    }
                } else if (operator === '<') {
                    if (obj[item] < parseInt(value)) {
                        nextBlock = endpoints[0]
                        continue workflowLoop
                    } else {
                        if (endpoints.length > 1) {
                            nextBlock = endpoints[1]
                            continue workflowLoop
                        } else {
                            flow = flow.substr(commaIndexes.shift()+1)
                            continue
                        }
                    }
                }
            }
        }

        total += nextBlock === 'A' ? Object.values(obj).reduce((a,b) => a + b) : 0

    }

    return total
}

console.log(solve(readInput()))