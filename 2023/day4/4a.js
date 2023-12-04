import { readInput } from '../inputUtils.js'


function intersectArray(arr1, arr2) {
    return arr1.filter(Set.prototype.has, new Set(arr2))
}

export function solve(input) {
    const lines = input.split('\n')

    return lines.map((line, index) => {
        let splitLine = line.split("|")

        let winningNums = splitLine[0].trim().split(": ")[1].trim().split(/[ ]+/)
        let ownNums = splitLine[1].trim().split(/[ ]+/)

        let matches = intersectArray(winningNums, ownNums)

        return matches.length > 0 ? matches.reduce((a,b) => a === 0 ? a = 1 : a * 2, 0) : 0
    }).reduce((a,b) => a + b)
}

console.log(solve(readInput()))