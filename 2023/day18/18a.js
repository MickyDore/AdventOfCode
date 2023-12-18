import { readInput } from '../inputUtils.js'

function getNewPoint(currentPoint, direction, length) {
    if (direction === 'R') return [currentPoint[0], currentPoint[1]+length]
    if (direction === 'L') return [currentPoint[0], currentPoint[1]-length]
    if (direction === 'U') return [currentPoint[0]-length, currentPoint[1]]
    if (direction === 'D') return [currentPoint[0]+length, currentPoint[1]]
}

// use the shoelace formula to calculate the area of a polygon
// https://www.geeksforgeeks.org/area-of-a-polygon-with-given-n-ordered-vertices/
function getPolygonArea(X, Y, numPoints) { 
    let area = 0;
    let j = numPoints - 1; 

    for (let i=0; i<numPoints; i++) { 
        area +=  (X[j]+X[i]) * (Y[j]-Y[i]); 
        j = i;
    }

    return Math.abs(area/2);
}

export function solve(input) {
    const lines = input.split('\n').map(line => line.split(" "))

    const startingPoint = [0,0]
    const pathPoints = [startingPoint]

    let tiles = 0

    for (let i = 0; i < lines.length; i++) {
        tiles+= parseInt(lines[i][1])
        let lastPoint = pathPoints[pathPoints.length-1]
        pathPoints.push(getNewPoint(lastPoint, lines[i][0], parseInt(lines[i][1])))
    }

    const xPoints = pathPoints.map(el => el[0])
    const yPoints = pathPoints.map(el => el[1])
    const polyArea = getPolygonArea(xPoints, yPoints, pathPoints.length)

    return tiles + (polyArea - (tiles / 2) + 1)
}

console.log(solve(readInput()))