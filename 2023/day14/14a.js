import { readInput } from '../inputUtils.js'

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

export function solve(input) {
    const lines = input.split('\n')

    let sum = 0
    let newChart = lines.map(row => row.split(''))

    for (let i = 0; i < lines[0].length; i++) {
        const col = lines.map(row => row[i])

        let newCol = rollRocks(col)
        newCol.forEach((symbol, index) => newChart[index][i] = symbol)
    }
    
    sum += countLoad(newChart)

    return sum
}

console.log(solve(readInput()))