import { readInput } from '../inputUtils.js'

export function solve(input) {
    const lines = input.split('\n')
    
    const time = parseInt([...lines[0].matchAll(/\d+/g)].join(""))
    const distance = parseInt([...lines[1].matchAll(/\d+/g)].join(""))

    let waysToWin = []
    let counter = 0

    while (counter < time) {
        if (counter * (time - counter) > distance) waysToWin++
        counter++
    }

    return waysToWin
}

console.log(solve(readInput()))