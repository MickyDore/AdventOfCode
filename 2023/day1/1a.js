import { readFileSync } from 'fs'

export function readInput() {
    return readFileSync('../data/day1.txt').toString().trim()
}

export function solve(input) {
    const lines = input.split('\n')
    return lines.map(line => {
        const nums = line.replace(/\D+/g, '') // leave only numbers

        return parseInt('' + nums[0] + nums.at(-1))
    }).reduce((a,b) => a + b, 0)
}