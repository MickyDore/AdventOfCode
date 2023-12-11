import { readInput } from '../inputUtils.js'

const EXPANSION_NUMBER = 1_000_000

function findExpandedRows(tiles) {
    let expandedRows = []

    for (let i = 0; i < tiles.length; i++) {
        if (!tiles[i].includes('#')) expandedRows.push(i)
    }

    return expandedRows
}

function findExpandedColumns(tiles) {
    let expandedColumns = []

    for (let i = 0; i < tiles[0].length; i++) {
        let map = tiles.map(row => row[i]).filter(symbol => symbol !== '.')
        if (!map.length) expandedColumns.push(i)
    }

    return expandedColumns
}


export function solve(input) {
    const lines = input.split('\n')
    const tiles = lines.map(line => line.split(''))

    const expandedRows = findExpandedRows(tiles)
    const expandedColumns = findExpandedColumns(tiles)

    let hashLocations = []

    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[i].length; j++) {
            if (tiles[i][j] === '#') hashLocations.push([i, j])
        }
    }

    let sum = 0

    for (let i = 0; i < hashLocations.length - 1; i++) {
        for (let j = i + 1; j < hashLocations.length; j++) {
            let xOffset = 0, yOffset = 0
            expandedRows.forEach(row => {
                if (row > Math.min(hashLocations[i][0], hashLocations[j][0]) && row < Math.max(hashLocations[j][0], hashLocations[i][0])) {
                    yOffset += EXPANSION_NUMBER - 1
                }
            })
            expandedColumns.forEach(column => {
                if (column > Math.min(hashLocations[i][1], hashLocations[j][1]) && column < Math.max(hashLocations[j][1], hashLocations[i][1])) {
                    xOffset += EXPANSION_NUMBER - 1
                }
            })

            sum += (Math.abs((hashLocations[i][1] - hashLocations[j][1])) + yOffset) + (Math.abs((hashLocations[i][0] - hashLocations[j][0])) + xOffset)
        }
    }

    return sum
}

console.log(solve(readInput()))