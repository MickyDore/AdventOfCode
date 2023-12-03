import { readFileSync } from 'fs'

const MAX_BALL_QUANTITIES = {
    red: 12,
    green: 13,
    blue: 14
}

export function readInput() {
    return readFileSync('../data/day2.txt').toString().trim()
}

export function solve(input) {
    const lines = input.split('\n')

    // look forward regex, find the number before a given word
    const numberBeforeColorRegex = (color) => new RegExp(String.raw`(\d+)(?=\s*${color})`, 'g')

    return lines.map(line => {
        const id = parseInt(line.split(':')[0].match(/\d+/)) // get game number
        const balls = line.split(":")[1] // get all ball number choices
        let counter = id

        for (const [key, value] of Object.entries(MAX_BALL_QUANTITIES)) {
            let num = balls.matchAll(numberBeforeColorRegex(key)) // get all picks for a given color
            let max = Math.max(...Array.from(num || []).map(arr => arr[0])) // find the max

            if (max > value) { // check if max is higher than threshold
                counter = 0
                break
            }
        }

        return counter
    }).reduce((a,b) => a + b, 0)
}