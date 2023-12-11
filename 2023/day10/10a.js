import { readInput } from '../inputUtils.js'

const validDirections = {
    'S': ['EAST', 'WEST', 'SOUTH', 'NORTH'],
    '-': ['EAST', 'WEST'],
    '7': ['SOUTH', 'WEST'],
    'F': ['SOUTH', 'EAST'],
    'J': ['NORTH', 'WEST'],
    'L': ['NORTH', 'EAST'],
    '|': ['SOUTH', 'NORTH'],
    '.': []
}

function pointsAreDifferent(point1, point2) {
    return point1[0] !== point2[0] || point1[1] !== point2[1]
}

function findStartingPoint(rows) {
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].indexOf('S') >= 0) {
            return [i, rows[i].indexOf('S')]
        }
    }
}

function findNeighbours(invalidTile, position, tiles) {
    let pipePart = tiles[position[0]][position[1]]
    let neighbours = []

    const directions = validDirections[pipePart]
    
    // check above
    if (directions.includes('NORTH') && position[0] > 0) {
        let pipeAbove = tiles[position[0]-1][position[1]]
        if (validDirections[pipeAbove].includes('SOUTH')) {
            neighbours.push([position[0]-1, position[1]])
        }
    }

    // check below
    if (directions.includes('SOUTH') && position[0] < tiles.length - 1) {
        let pipeBelow = tiles[position[0]+1][position[1]]
        if (validDirections[pipeBelow].includes('NORTH')) {
            neighbours.push([position[0]+1, position[1]])
        }
    }

    // check left
    if (directions.includes('WEST') && position[1] > 0) {
        let pipeLeft = tiles[position[0]][position[1]-1]
        if (validDirections[pipeLeft].includes('EAST')) {
            neighbours.push([position[0], position[1]-1])
        }
    }

    // check right
    if (directions.includes('EAST') && position[1] < tiles[0].length - 1) {
        let pipeRight = tiles[position[0]][position[1]+1]
        if (validDirections[pipeRight].includes('WEST')) {
            neighbours.push([position[0], position[1]+1])
        }
    }

    let filteredNeighbours = neighbours.filter(tile => pointsAreDifferent(tile, invalidTile))
    return filteredNeighbours.length > 1 ? filteredNeighbours : filteredNeighbours[0]
}

export function solve(input) {
    const lines = input.split('\n')
    const tiles = lines.map(line => line.split(''))

    const startingPoint = findStartingPoint(lines)

    let previousPoints = [startingPoint, startingPoint]
    let neighbourPoints = findNeighbours(startingPoint, startingPoint, tiles)
    let steps = 1

    while (pointsAreDifferent(neighbourPoints[0], neighbourPoints[1])) {
        let tempPoints = [...neighbourPoints]

        neighbourPoints[0] = findNeighbours(previousPoints[0], neighbourPoints[0], tiles)
        neighbourPoints[1] = findNeighbours(previousPoints[1], neighbourPoints[1], tiles)
        previousPoints = tempPoints

        steps++
    }

    return steps
    

}

console.log(solve(readInput()))