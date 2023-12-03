import { readFileSync } from 'fs'

const BALL_COLORS = ['red', 'green', 'blue']

export function readInput() {
    return readFileSync('../data/day2.txt').toString().trim()
}

export function solve(input) {
    const lines = input.split('\n')

    // look forward regex, find the number before a given word
    const numberBeforeColorRegex = (color) => new RegExp(String.raw`(\d+)(?=\s*${color})`, 'g')

    return lines.map(line => {
        const balls = line.split(":")[1] // get all ball number choices
        let maxNumberOfColors = []

        BALL_COLORS.forEach(color => { 
            let num = balls.matchAll(numberBeforeColorRegex(color)) // get all picks for a given color
            let max = Math.max(...Array.from(num || []).map(arr => arr[0])) // find the max

            maxNumberOfColors.push(max) // add max for color to array
        }) 

        return maxNumberOfColors.reduce((a,b) => a * b) // return power of all max values
    }).reduce((a,b) => a + b, 0)
}