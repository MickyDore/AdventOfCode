import { readInput } from '../inputUtils.js'


function intersectArray(arr1, arr2) {
    return arr1.filter(Set.prototype.has, new Set(arr2))
}

function getCardMatches(line) {
    let splitLine = line.split("|")

    let winningNums = splitLine[0].trim().split(": ")[1].trim().split(/[ ]+/)
    let ownNums = splitLine[1].trim().split(/[ ]+/)

    let matches = intersectArray(winningNums, ownNums)

    return matches.length
}

// store all card indexes and quantities
const cardMap = {}

export function solve(input) {
    const lines = input.split('\n')

    for (let i = 1; i <= lines.length; i++) {
        cardMap[i] = 1
    }

    Object.keys(cardMap).forEach((line, index) => {
        for (let i = 0; i < cardMap[line]; i++) {
            let card = lines[index]
            const matches = getCardMatches(card) // find number of matches for given card

            for (let j = 1; j < matches + 1; j++) {
                const index = parseInt(line) + parseInt(j)
                cardMap[index] = cardMap[index] + 1
            }
        }
    })

    return Object.values(cardMap).reduce((a,b) => a + b)
}

console.log(solve(readInput()))