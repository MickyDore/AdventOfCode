import { readFileSync } from 'fs'

// replace strings with digitFirstChar + digit + digitLastChar to avoid overlapping char problems
const numberMap = { 
    'zero': 'z0o',
    'one': 'o1e', 
    'two': 't2o', 
    'three': 't3e', 
    'four': 'f4r', 
    'five': 'f5e', 
    'six': 's6x', 
    'seven': 's7n', 
    'eight': 'e8t', 
    'nine': 'n9e'
}

export function readInput() {
    return readFileSync('../data/day1.txt').toString().trim()
}

export function solve(input) {
    const lines = input.split('\n')

    return lines.map(line => {
        let convertStringsToNums = line
        for (const [key, value] of Object.entries(numberMap)) {
            convertStringsToNums = convertStringsToNums.replaceAll(key, value)
        }

        const nums = convertStringsToNums.replace(/\D+/g, '') // leave only numbers

        return parseInt('' + nums[0] + nums.at(-1))
    }).reduce((a,b) => a + b, 0)
}