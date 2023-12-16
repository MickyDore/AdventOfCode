import { readInput } from '../inputUtils.js'

// map for converting directions, key = from, value = to
const directionMap = {
    'WEST': 'EAST',
    'EAST': 'WEST',
    'NORTH': 'SOUTH',
    'SOUTH': 'NORTH'
}

// get tile in direction from current tile, checking for edge cases
function getNextTile(grid, tile, direction) {
    const rows = grid.length
    const cols = grid[0].length

    if (direction === 'EAST') {
        if (tile[1] >= cols - 1) return false
        return [tile[0],tile[1]+1]
    }
    if (direction === 'WEST') {
        if (tile[1] <= 0) return false
        return [tile[0],tile[1]-1]
    }
    if (direction === 'NORTH') {
        if (tile[0] <= 0) return false
        return [tile[0]-1,tile[1]]
    }
    if (direction === 'SOUTH') {
        if (tile[0] >= rows - 1) return false
        return [tile[0]+1,tile[1]]
    }
}

function parseGrid(grid, startingTile) {
    const hitTiles = new Map()
    const pathTiles = new Map()
    const nextMoves = [startingTile]

    while (nextMoves.length) {
        nextMoves.forEach((move, index) => {
            // track coordinates that we hit
            hitTiles.set(move.pos.join("_"), true)
            
            // track current tile and entry, if we get here again, we can stop
            let mapKey = `${move.pos.join("_")}_${move.from}`
            if (pathTiles.get(mapKey)) {
                nextMoves.splice(index, 1)
                return
            }

            const direction = directionMap[move.from]
            let tile = grid[move.pos[0]][move.pos[1]]

            if (tile === '.') {
                let nextTile = getNextTile(grid, move.pos, direction)
                if (nextTile) nextMoves.push({pos: nextTile, from: move.from})
            }

            if (tile === '/') {
                if (move.from === 'WEST') {
                    let nextTile = getNextTile(grid, move.pos, 'NORTH')
                    if (nextTile) nextMoves.push({pos: nextTile, from: 'SOUTH'})
                }
                if (move.from === 'EAST') {
                    let nextTile = getNextTile(grid, move.pos, 'SOUTH')
                        if (nextTile) nextMoves.push({pos: nextTile, from: 'NORTH'})
                    }
                if (move.from === 'NORTH') {
                    let nextTile = getNextTile(grid, move.pos, 'WEST')
                    if (nextTile) nextMoves.push({pos: nextTile, from: 'EAST'})
                }
                if (move.from === 'SOUTH') {
                    let nextTile = getNextTile(grid, move.pos, 'EAST')
                    if (nextTile) nextMoves.push({pos: nextTile, from: 'WEST'})
                }
            }

            if (tile === '\\') {
                if (move.from === 'WEST') {
                    let nextTile = getNextTile(grid, move.pos, 'SOUTH')
                    if (nextTile) nextMoves.push({pos: nextTile, from: 'NORTH'})
                }
                if (move.from === 'EAST') {
                    let nextTile = getNextTile(grid, move.pos, 'NORTH')
                        if (nextTile) nextMoves.push({pos: nextTile, from: 'SOUTH'})
                    }
                if (move.from === 'NORTH') {
                    let nextTile = getNextTile(grid, move.pos, 'EAST')
                    if (nextTile) nextMoves.push({pos: nextTile, from: 'WEST'})
                }
                if (move.from === 'SOUTH') {
                    let nextTile = getNextTile(grid, move.pos, 'WEST')
                    if (nextTile) nextMoves.push({pos: nextTile, from: 'EAST'})
                }
            }

            if (tile === '|') {
                if (move.from === 'WEST' || move.from === 'EAST') {
                    let firstTile = getNextTile(grid, move.pos, 'NORTH')
                    let secondTile = getNextTile(grid, move.pos, 'SOUTH')
                    if (firstTile) nextMoves.push({pos: firstTile, from: 'SOUTH'})
                    if (secondTile) nextMoves.push({pos: secondTile, from: 'NORTH'})
                }
                if (move.from === 'NORTH' || move.from === 'SOUTH') {
                    let nextTile = getNextTile(grid, move.pos, direction)
                    if (nextTile) nextMoves.push({pos: nextTile, from: move.from})
                }
            }

            if (tile === '-') {
                if (move.from === 'WEST' || move.from === 'EAST') {
                    let nextTile = getNextTile(grid, move.pos, direction)
                    if (nextTile) nextMoves.push({pos: nextTile, from: move.from})
                }

                if (move.from === 'NORTH' || move.from === 'SOUTH') {
                    let firstTile = getNextTile(grid, move.pos, 'WEST')
                    let secondTile = getNextTile(grid, move.pos, 'EAST')
                    if (firstTile) nextMoves.push({pos: firstTile, from: 'EAST'})
                    if (secondTile) nextMoves.push({pos: secondTile, from: 'WEST'})

                }
            }

            pathTiles.set(mapKey, true) // add current tile to the path tiles we've hit
            nextMoves.splice(index, 1)  // remove the tile we just checked
        })
    }

    return hitTiles.size
}

export function solve(input) {
    const lines = input.split('\n')
    const grid = lines.map(line => line.split(''))

    let max = 0

    const rows = lines.length
    const cols = lines[0].length

    // find energised tiles for all column entries
    for (let i = 0; i < cols; i++) {
        let down = parseGrid(grid, { pos: [0, i], from: 'NORTH' })
        let up = parseGrid(grid, { pos: [rows-1, i], from: 'SOUTH' })

        max = Math.max(down, up, max)
    }

    // find energised tiles for all row entries
    for (let i = 0; i < rows; i++) {
        let left = parseGrid(grid, { pos: [i, 0], from: 'WEST' })
        let right = parseGrid(grid, { pos: [i, cols-1], from: 'EAST' })

        max = Math.max(left, right, max)
    }

    return max
}

console.log(solve(readInput()))