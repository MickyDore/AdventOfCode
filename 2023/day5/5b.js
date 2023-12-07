import { readInput } from '../inputUtils.js'

function between(num, min, max) {
    return num >= min && num <= max
}

function getSeedFromLocation(seed, lines) {
    const numberOfMaps = lines.length - 1 // remove seeds from number of maps
    for (let i = numberOfMaps; i >= 1; i--) {
        let map = lines[i].split(":")[1].split(/\n/).filter(e => e !== "")
        
        for (let j = 0; j < map.length; j++) {
            let nums = map[j].split(" ").map(num => parseInt(num))
            let source = nums[0]
            let start = nums[1]
            let range = nums[2]

            if (source <= seed && source + range > seed) {
                seed = start + seed - source;
                break
            }
        }
    }
    return seed
}

function doesSeedExist(seed, seeds) {
    for (let i = 0; i < seeds.length; i+=2) {
        if (between(seed, seeds[i], seeds[i] + seeds[i+1])) {
            return true
        }
    }
    return false
}

export function solve(input) {
    const lines = input.split(/\r?\n\r?\n/)

    const numberOfMaps = lines.length - 1 // remove seeds from number of maps

    const seeds = lines[0].split(": ")[1].split(" ").map(seed => parseInt(seed))

    for (let i = 0; i < 1_000_000_000; i++) {
        let seed = getSeedFromLocation(i, lines)
        console.log(`Location ${i} gives seed ${seed}.`)

        if (doesSeedExist(seed, seeds)) {
            return seed
        }
    }

}

console.log(solve(readInput()))