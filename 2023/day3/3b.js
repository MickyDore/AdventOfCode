import { readInput } from '../inputUtils.js'

const gearMap = {}

const findGears = (str, num, i, j) => {
    for (let k = 0; k < str.length; k++) {
        const char = str.charAt(k)
        if (char === '*') {
            const index = `${i}-${j + k}`
            gearMap[index] = gearMap[index] ? [...gearMap[index], parseInt(num)] : [parseInt(num)]
        }
    }
}

export function solve(input) {
    const lines = input.split('\n')

    lines.forEach((line, index) => {
        let previousLine = index > 0 ? lines[index - 1] : null
        let nextLine = index < lines.length - 1 ? lines[index + 1] : null

        const matches = line.matchAll(/\d+/g)

        for (const match of matches) {
            let matchIndex = match.index

            let leftOffset = matchIndex > 0 ? -1 : 0
            let rightOffset = matchIndex + match[0].length + 1 < line.length ? 1 : 0

            let above = index > 0 ? previousLine.substring(matchIndex+leftOffset, matchIndex + match[0].length + rightOffset) : ""
            let below = index < lines.length - 1 ? nextLine.substring(matchIndex+leftOffset, matchIndex + match[0].length + rightOffset) : ""
            let left = matchIndex > 0 ? match.input.charAt(matchIndex + leftOffset) : ""
            let right = matchIndex + match[0].length < line.length ? match.input.charAt(matchIndex+match[0].length) : ""

            findGears(above, match[0], index - 1, matchIndex - 1)
            findGears(below, match[0], index + 1, matchIndex - 1)
            findGears(left, match[0], index, matchIndex + leftOffset)
            findGears(right, match[0], index, matchIndex + match[0].length + rightOffset - 1)
        }  

        
    })

    const value =  Object.values(gearMap)
    .filter(x => x.length === 2)
    .map(arr => arr[0] * arr[1])
    .reduce((a,b) => a + b)

    return value
}

console.log(solve(readInput()))