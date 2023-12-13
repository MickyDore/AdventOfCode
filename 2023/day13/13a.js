import { readInput } from '../inputUtils.js'

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] === arr2[i]) continue
        return false
    }

    return true
}

function findVerticalMirror(map) {
    const cols = map[0].length

    const validStarts = []
    for (let i = 0; i < cols - 1; i++) {
        if (arraysAreEqual(map.map(line => line[i]), map.map(line => line[i+1]))) validStarts.push([i, i+1])
    }

    startLoop: for (let i = 0; i < validStarts.length; i++) {
        const availableSpaces = Math.min(validStarts[i][0], cols - 1 - validStarts[i][1])
        for (let j = 1; j <= availableSpaces; j++) {
            if (arraysAreEqual(map.map(line => line[validStarts[i][0]-j]), map.map(line => line[validStarts[i][1]+j]))) continue
                continue startLoop
        }

        return validStarts[i][0] + 1
    }

    return 0
}

function findHorizontalMirror(map) {
    const rows = map.length

    const validStarts = []
    for (let i = 0; i < rows - 1; i++) {
        if (arraysAreEqual(map[i], map[i+1])) validStarts.push([i, i+1])
    }

    startLoop: for (let i = 0; i < validStarts.length; i++) {
        const availableSpaces = Math.min(validStarts[i][0], rows - 1 - validStarts[i][1])
        for (let j = 1; j <= availableSpaces; j++) {
            if (arraysAreEqual(map[validStarts[i][0]-j], map[validStarts[i][1]+j])) continue
            continue startLoop
        }

        return validStarts[i][0] + 1
    }

    return 0
}


export function solve(input) {
    const blocks = input.split('\n\n')

    let sum = 0

    blocks.forEach((block) => {
        const rows = findHorizontalMirror(block.split("\n").map(line => line.split("")))
        const cols = findVerticalMirror(block.split("\n").map(line => line.split("")))
        
        sum += cols + (rows * 100)
    })

    return sum
}

console.log(solve(readInput()))