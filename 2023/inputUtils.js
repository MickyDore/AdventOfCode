import { readFileSync } from 'fs'

export function readInput() {
    return readFileSync('./input.txt', 'UTF_8').toString().trim()
}