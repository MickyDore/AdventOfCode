import { readInput } from '../inputUtils.js'

export function solve(input) {
    const lines = input.split('\n\n')
    
    const instructions = lines[0]
    const maps = lines[1]

    /**
     *     Create map with the form
     *     {
     *         AAA: [BBB, CCC],
     *         ...,
     *         XXX: [YYY, ZZZ] 
     *     }
     */
    const map = maps.split('\n').reduce((a, v) => {
        const key = v.split(" =")[0]
        const options = v.split("= ")[1] 
        const value = [...options.matchAll(/\w{3}/g)].map(words => words[0])

        return ({ ...a, [key]: value})
    }, {}) 

    let steps = 0
    let destination = 'AAA';

    while (destination !== 'ZZZ') {
        let direction = instructions.charAt(steps % instructions.length) === 'L' ? 0 : 1
        destination = map[destination][direction]
        steps++
    }

    return steps
}

console.log(solve(readInput()))