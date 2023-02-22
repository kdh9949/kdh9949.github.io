import { sum } from './util.js'

const eyes = (eye) => (dices) => eye * dices.filter(x => x === eye).length

const choice = (dices) => sum(dices)

const four_cards = (dices) => {
  let sorted = [...dices]
  sorted.sort()
  return (sorted[0] === sorted[3] || sorted[1] === sorted[4]) ? sum(dices) : 0
}

const full_house = (dices) => {
  let sorted = [...dices]
  sorted.sort()
  return (sorted[0] === sorted[1] && sorted[2] === sorted[4]) ? sum(dices) :
         (sorted[0] === sorted[2] && sorted[3] === sorted[4]) ? sum(dices) : 0
}

const small_straight = (dices) => {
  let chk = Array(7).fill(false)
  dices.forEach((d) => { chk[d] = true })
  return (chk[1] && chk[2] && chk[3] && chk[4] ||
          chk[2] && chk[3] && chk[4] && chk[5] ||
          chk[3] && chk[4] && chk[5] && chk[6] ) ? 15 : 0
}

const large_straight = (dices) => {
  let sorted = [...dices]
  sorted.sort()
  return (sorted[0] + 1 === sorted[1] &&
          sorted[1] + 1 === sorted[2] &&
          sorted[2] + 1 === sorted[3] &&
          sorted[3] + 1 === sorted[4]) ? 30 : 0
}

const yacht = (dices) => (dices.filter(x => x == dices[0]).length == 5 ? 50 : 0)

export const calc_score = [
  eyes(1), eyes(2), eyes(3), eyes(4), eyes(5), eyes(6),
  choice, four_cards, full_house, small_straight, large_straight, yacht
]