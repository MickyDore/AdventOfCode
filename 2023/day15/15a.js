import { readInput } from '../inputUtils.js'

function hashString(str) {
    let total = 0

    for (let i = 0; i < str.length; i++) {
        let hash = total + str.charCodeAt(i)
        hash *= 17
        hash = hash % 256
        total = hash
    }

    return total
}


export function solve(input) {
    const words = input.split(',')

    let total = 0

    for (let i = 0; i < words.length; i++) {
        total += hashString(words[i])
    }

    return total
}

console.log(solve(readInput()))