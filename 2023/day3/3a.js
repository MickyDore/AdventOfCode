import { readInput } from '../inputUtils.js'

export function solve(input) {
    const lines = input.split('\n')

    return lines.map((line, index) => {
        let partNumbers = []
        let previousLine = index > 0 ? lines[index - 1] : null
        let nextLine = index < lines.length - 1 ? lines[index + 1] : null

        const matches = line.matchAll(/\d+/g)

        for (const match of matches) {
            let matchIndex = match.index
            let canCheckLeft = matchIndex > 0
            let canCheckRight = matchIndex + match[0].length < line.length - 1 
            let leftOffset = matchIndex > 0 ? -1 : 0
            let rightOffset = matchIndex + match[0].length + 1 < line.length ? 1 : 0

            if (previousLine) {
                let rowAbove = previousLine.substring(matchIndex+leftOffset, matchIndex + match[0].length + rightOffset)
                if ((/[^\.]/g).test(rowAbove)) {
                    partNumbers.push(parseInt(match[0]))
                    continue
                }
            }

            if (nextLine) {
                let rowBelow = nextLine.substring(matchIndex+leftOffset, matchIndex + match[0].length + rightOffset)
                if ((/[^\.]/g).test(rowBelow)) {
                    partNumbers.push(parseInt(match[0]))
                    continue
                }
            }

            if (canCheckLeft) {
                if (match.input.charAt(matchIndex-1) !== '.') {
                    partNumbers.push(parseInt(match[0]))
                    continue
                }
            }
            
            if (canCheckRight) {
                if (match.input.charAt(matchIndex+match[0].length) !== '.') {
                    partNumbers.push(parseInt(match[0]))
                    continue
                }
            }
        }  

        return partNumbers.length ? partNumbers.reduce((a,b) => a + b) : 0
    }).reduce((a,b) => a + b)
}

console.log(solve(readInput()))