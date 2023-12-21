import { readInput } from '../inputUtils.js'

function findStartingPoint(grid) {
    const rows = grid.length
    for (let i = 0; i < rows; i++) {
        if (grid[i].indexOf('S') >= 0) {
            return [i, grid[i].indexOf('S')]
        }
    }
}

function traverseGrid(grid, start, maxSteps) {
    const seen = new Set()
    const end = new Set()
    const queue = []

    const startPoint = [start[0], start[1], 0] // [x, y, steps]
    queue.push(startPoint)

    while (queue.length) {
        const nextStep = queue.shift()
        const [x, y, steps] = nextStep

        let key = JSON.stringify([x, y, steps])
        if (!seen.has(key)) {
            seen.add(key)

            if (steps === maxSteps) {
                end.add(JSON.stringify(nextStep))
                continue
            }

            for (const [ndx, ndy] of [[0,1], [1,0], [0,-1], [-1, 0]]) {
                const newX = x + ndx
                const newY = y + ndy

                if (0 <= newX && newX < grid.length && 0 <= newY && newY < grid[0].length && grid[newX][newY] !== '#') {
                    queue.push([newX, newY, steps + 1])
                }
            }

        }
    }

    return end
}

export function solve(input) {
    const lines = input.split('\n')
    const grid = lines.map(line => line.split(''))

    const startPoint = findStartingPoint(grid)
    const endPoints= traverseGrid(grid, startPoint, 64)

    return endPoints.size
}

console.log(solve(readInput()))