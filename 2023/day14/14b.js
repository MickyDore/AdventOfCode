import { readInput } from '../inputUtils.js'

const cache = new Map()
let checks = 0
let repeat = 0

function rollRocks(rocks) {
    let topIndex = 0
    let rocksLength = 0
    
    for (let i = 0 ; i < rocks.length; i++) {
        // empty space, we can just continue
        if (rocks[i] === '.') continue

        // if we hit a square rock, the furthest a circle rock can go is the point after it
        if (rocks[i] === '#') {
            topIndex = i + 1
            continue
        }

        if (rocks[i] === 'O') {
            // if rock is already in furthest position it can go, continue
            if (i === topIndex) {
                topIndex++
                continue
            }

            rocksLength++
            
            for (let j = i; j < rocks[i].length; j++) {
                if (rocks[j] === 'O') rocksLength++
                else break
            }

            rocks.splice(topIndex, rocksLength, ...Array(rocksLength).fill('O')) // move rocks to top index
            rocks.splice(i, rocksLength, ...Array(rocksLength).fill('.')) // replace rocks with dots

            topIndex = topIndex + rocksLength // new top index moves to after the moved rocks
            rocksLength = 0
        }
    }

    return rocks
}

function countLoad(rocks) {
    let load = 0
    let loadPressure = rocks.length

    for (let i = 0; i < rocks.length; i++) {
        let numOfRocks = [...rocks[i].join("").matchAll(/\O/gi)].map(match => match[0]).length
        load += numOfRocks * loadPressure--
    }
    return load
}

function rollNorth(lines) {
    for (let i = 0; i < lines[0].length; i++) {
        const col = lines.map(row => row[i])

        let newCol = rollRocks(col)
        newCol.forEach((symbol, index) => lines[index][i] = symbol)
    }
} 

function performCycle(lines) {
    for (let i = 0; i < 4; i++) {
        rollNorth(lines)
        transpose(lines)
    }
    checks++

    let hash = lines.flat().join('')
    if (cache.has(hash)) repeat = cache.get(hash)
    else cache.set(hash, checks)
}

// rotates an array 90 degrees clockwise
function transpose(matrix) {
    const n = matrix.length;
    const x = Math.floor(n/ 2);
    const y = n - 1;
    for (let i = 0; i < x; i++) {
       for (let j = i; j < y - i; j++) {
          let k = matrix[i][j];
          matrix[i][j] = matrix[y - j][i];
          matrix[y - j][i] = matrix[y - i][y - j];
          matrix[y - i][y - j] = matrix[j][y - i]
          matrix[j][y - i] = k
       }
    }
  }

export function solve(input) {
    const lines = input.split('\n')

    const CYCLES = 1_000_000_000

    let sum = 0
    let newChart = lines.map(row => row.split(''))

    for (let i = 0; i < CYCLES; i++) {
        if (repeat) {
            const loopStart = repeat
            const loopLength = i - loopStart;

            const remainingCycles = CYCLES - i;
            const realRemaining = remainingCycles % loopLength;

            for (let j = 0; j < realRemaining; j++) {
                performCycle(newChart)
            }
            break
        }
        else {
            performCycle(newChart)
        }
    }
    sum += countLoad(newChart)

    return sum
}

console.log(solve(readInput()))