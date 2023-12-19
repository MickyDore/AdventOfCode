import { readInput } from '../inputUtils.js'

const workflows = {}
const parts = []

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

    for (let i = 0; i < workflowsBlock.length; i++) {
        const bracket = workflowsBlock[i].indexOf('{')
        workflows[workflowsBlock[i].substr(0,bracket)] = workflowsBlock[i].substr(bracket+1, workflowsBlock[i].length-bracket-2)
    }

    const min = 1
    const max = 4000

    const firstBlock = { 
        code: 'in', 
        quantities: {
            x: { min, max },
            m: { min, max },
            a: { min, max },
            s: { min, max },
        } 
    }

    const blocksToCheck = [firstBlock]

    workflowLoop: while (blocksToCheck.length) {
        console.log(JSON.stringify(blocksToCheck) + '\n')
        let nextBlock = blocksToCheck.pop()
        const obj = nextBlock.quantities

        if (nextBlock.code === 'R') continue
        if (nextBlock.code === 'A') {
            let sum = 1

            for (const [key, value] of Object.entries(nextBlock.quantities)) {
                sum *= value.max - value.min + 1
            }

            total += sum
            continue
        }

        let flow = workflows[nextBlock.code]

        // console.log(nextBlock.code, obj, flow)

        while (flow.indexOf(',')) {
            let commaIndexes = [...flow.matchAll(/,/g)].map(match => match.index)

            // if this is the last expression
            let expression = commaIndexes.length === 1 ? flow : flow.substr(0, flow.indexOf(','))

            let item = expression.charAt(0)
            let operator = expression.charAt(1)
            let value = parseInt(expression.substr(2, expression.indexOf(':') - 2))
            let endpoints = expression.split(':')[1].split(',')

            if (operator === '>') {
                if (obj[item].max > value) {
                    // nextBlock = endpoints[0]
                    // nextBlock.code = endpoints[0]
                    // nextBlock.quantities[item].min = value + 1
                    // blocksToCheck.push({...nextBlock})
                    let newBlock = JSON.parse(JSON.stringify(nextBlock))
                    newBlock.code = endpoints[0]
                    newBlock.quantities[item].min = value + 1
                    blocksToCheck.push(newBlock)

                    if (endpoints.length > 1) {
                        let newBlock = JSON.parse(JSON.stringify(nextBlock))
                        newBlock.code = endpoints[1]
                        newBlock.quantities[item].max = value - 1
                        blocksToCheck.push(newBlock)
                    } else {
                        if (obj[item].min < value) {
                            console.log(nextBlock.quantities[item].max)
                            nextBlock.quantities[item].max = value
                        }
                    }

                    if (endpoints.length > 1) continue workflowLoop
                    // continue
                } else {
                    nextBlock.code = endpoints[1]
                    nextBlock.quantities[item].min = value - 1
                    blocksToCheck.push({...nextBlock})

                    if (endpoints.length > 1) {
                        continue workflowLoop
                    } else {
                        flow = flow.substr(commaIndexes.shift()+1)
                        continue
                    }
                }
            } else if (operator === '<') {
                if (obj[item].min < value) {
                    let newBlock = JSON.parse(JSON.stringify(nextBlock))
                    newBlock.code = endpoints[0]
                    newBlock.quantities[item].max = value - 1
                    blocksToCheck.push(newBlock)
                    
                    if (endpoints.length > 1) {
                        let newBlock = JSON.parse(JSON.stringify(nextBlock))
                        newBlock.code = endpoints[1]
                        newBlock.quantities[item].min = value
                        blocksToCheck.push(newBlock)
                    }

                    continue workflowLoop
                } else {
                    nextBlock.code = endpoints[1]
                    nextBlock.quantities[item].min = nextBlock.quantities[item].min + value - 1
                    blocksToCheck.push({...nextBlock})
                    if (endpoints.length > 1) {
                        continue workflowLoop
                    } else {
                        flow = flow.substr(commaIndexes.shift()+1)
                        continue
                    }
                }
            }
        }

        total += nextBlock === 'A' ? 1 : 0

    }

    return total
}

console.log(solve(readInput()))