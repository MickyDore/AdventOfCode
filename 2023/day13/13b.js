import { readInput } from '../inputUtils.js'

const cache = new Map()

function arraysAreEqual(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] === arr2[i]) continue
        return false
    }
    return true
}

function findVerticalMirror(index, map, shouldCache = false) {
    const cols = map[0].length

    // Find the indexes of all column pairs that are identical
    const validStarts = []
    for (let i = 0; i < cols - 1; i++) {
        if (arraysAreEqual(map.map(line => line[i]), map.map(line => line[i+1]))) validStarts.push([i, i+1])
    }


    startLoop: for (let i = 0; i < validStarts.length; i++) {
        let key = `${index}_${validStarts[i][0]}_${validStarts[i][1]}_VERTICAL` // cache original index pair
        if (cache.has(key)) continue // we can ignore these when looking for a new mirror line

        const availableSpaces = Math.min(validStarts[i][0], cols - 1 - validStarts[i][1])
        for (let j = 1; j <= availableSpaces; j++) {
            if (arraysAreEqual(map.map(line => line[validStarts[i][0]-j]), map.map(line => line[validStarts[i][1]+j]))) continue
                continue startLoop
        }

        if (shouldCache) cache.set(key, validStarts[i][0] + 1)

        return validStarts[i][0] + 1
    }

    return 0 // we found no valid vertical mirrors
}

function findHorizontalMirror(index, map, shouldCache = false) {
    const rows = map.length

    // Find the indexes of all row pairs that are identical
    let validStarts = []
    for (let i = 0; i < rows - 1; i++) {
        if (arraysAreEqual(map[i], map[i+1])) validStarts.push([i, i+1])
    }

    startLoop: for (let i = 0; i < validStarts.length; i++) {
        let key = `${index}_${validStarts[i][0]}_${validStarts[i][1]}_HORIZONTAL` // cache original index pair
        if (cache.has(key)) continue // we can ignore these when looking for a new mirror line

        const availableSpaces = Math.min(validStarts[i][0], rows - 1 - validStarts[i][1])
        for (let j = 1; j <= availableSpaces; j++) {
            if (arraysAreEqual(map[validStarts[i][0]-j], map[validStarts[i][1]+j])) continue
            continue startLoop
        }

        if (shouldCache) cache.set(key, validStarts[i][0] + 1)

        return validStarts[i][0] + 1
    }

    return 0
}

export function solve(input) {
    const blocks = input.split('\n\n')

    // Loop through blocks before smudging and cache the original mirror split indexes
    blocks.forEach((block, index) => {
        findHorizontalMirror(index, block.split("\n").map(line => line.split("")), true)
        findVerticalMirror(index, block.split("\n").map(line => line.split("")), true)
    })

    let sum = 0

    blockLoop: for (let b = 0; b < blocks.length; b++) {
        let parsedBlock = blocks[b].split("\n").map(line => line.split(""))

        // Change one symbol at a time until we get a valid new mirror line
        for (let i = 0; i < parsedBlock.length; i++) {
            for (let j = 0; j < parsedBlock[i].length; j++) {
                let copy = JSON.parse(JSON.stringify(parsedBlock))
                copy[i][j] = parsedBlock[i][j] === '.' ? '#' : '.'

                const rows = findHorizontalMirror(b, copy)
                const cols = findVerticalMirror(b, copy)
                
                sum += cols + (rows * 100)
                if (rows || cols) continue blockLoop // mirror found, we can move to the next block now
            }
        }
    }

    return sum
}

console.log(solve(readInput()))