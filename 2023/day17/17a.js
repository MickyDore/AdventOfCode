import { readInput } from '../inputUtils.js'
import { Heap } from 'heap-js'

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] === arr2[i]) continue
        return false
    }

    return true
}

function findShortestPath(grid) {
    // [heatLoss, xCoord, yCoord, xDirection, yDirection, numSteps]
    const startStep = [0, 0, 0, 0, 0, 0]
    const endPosition = [grid[0].length - 1, grid.length - 1]

    const seen = new Set()
    const queue = new Heap(([a],[b]) => a - b)
    queue.push(startStep)

    while(queue.size()) {
        const [hl, x, y, dx, dy, n] = queue.pop() // get the element with smallest heatloss

        if (x === endPosition[0] && y === endPosition[1]) return hl

        // if we have seen this cell with directions before, skip
        const key = JSON.stringify([x, y, dx, dy, n])
        if (seen.has(key)) continue
        seen.add(key)

        // go in the same direction if current steps are less than 3
        if (n < 3 && !arraysAreEqual([dx, dy], [0,0])) {
            let newX = x + dx
            let newY = y + dy
            if (0 <= newX && newX < grid.length && 0 <= newY && newY < grid[0].length) {
                queue.push([hl + grid[newX][newY], newX, newY, dx, dy, n + 1])
            }   
        }

        // check for a new direction, we can't go same direction or backwards (leaves left or right)
        for (const [newDx, newDy] of [[0,1], [1,0], [0,-1], [-1,0]]) {
            if (!arraysAreEqual([newDx, newDy],[dx, dy]) && !arraysAreEqual([newDx, newDy], [-dx, -dy])) {
                let newX = x + newDx
                let newY = y + newDy
                if (0 <= newX && newX < grid.length && 0 <= newY && newY < grid[0].length) {
                    queue.push([hl + grid[newX][newY], newX, newY, newDx, newDy, 1])
                }
            }
        }
    }
}

export function solve(input) {
    const lines = input.split('\n')
    const grid = lines.map(line => line.split('').map(Number))

    return findShortestPath(grid)
}

console.log(solve(readInput()))