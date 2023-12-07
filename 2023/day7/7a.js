import { readInput } from '../inputUtils.js'

// We should compare by Map size first and then the max frequency of the values
/**
 * Hand    Size   Max Freq
 * AAAAA      1          5
 * AAAAK      2          4
 * AAAKK      2          3
 * AAAKQ      3          3
 * AAKKQ      3          2
 * AAKQJ      4          2
 * AKQJT      5          1
 */

const cardRankings = '23456789TJQKA'

function splitIntoFrequencies(hand) {
    let cardMap = new Map()
    const cards = hand.split("")

    for (let i = 0; i < cards.length; i++) {
        cardMap.set(cards[i], cardMap.has(cards[i]) ? cardMap.get(cards[i]) + 1 : 1)
    }

    return cardMap
}

function compareHandMaps(hand1, hand2) {
    let hand1Map = splitIntoFrequencies(hand1)
    let hand2Map = splitIntoFrequencies(hand2)

    if (hand1Map.size !==  hand2Map.size) {
        return hand1Map.size > hand2Map.size ? -1 : 1
    }

    let hand1MaxFrequency = Math.max.apply(Math, [...hand1Map.values()])
    let hand2MaxFrequency = Math.max.apply(Math, [...hand2Map.values()])

    if (hand1MaxFrequency !== hand2MaxFrequency) {
        return hand1MaxFrequency > hand2MaxFrequency ? 1 : -1
    }

    for (let i = 0; i < hand1.length; i++) {
        const hand1CardRank = cardRankings.indexOf([hand1.charAt(i)])
        const hand2CardRank = cardRankings.indexOf([hand2.charAt(i)])
        if (hand1CardRank !== hand2CardRank) {
            return hand1CardRank > hand2CardRank ? 1 : -1
        }
    }

    return 0
}

export function solve(input) {
    const lines = input.split('\n')
    
    return lines.sort((a,b) => {
        let hand = a.split(" ")[0]
        let nextHand = b.split(" ")[0]
        return compareHandMaps(hand, nextHand)
    }).reduce((a,b,i) => {
        return a + (parseInt(b.split(" ")[1] * (i + 1)))
    }, 0)
}

console.log(solve(readInput()))