import { readFileSync } from 'fs'

export function readInput() {
    return readFileSync('./input.txt').toString().trim()
}