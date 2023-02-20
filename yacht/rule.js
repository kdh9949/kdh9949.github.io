import { sum } from './util.js'

const eyes = (eye) => (dices) => eye * dices.filter(x => x === eye).length

const choice = (dices) => sum(dices)

const four_cards = (dices) => {
  dices.sort()
  return (dices[0] === dices[3] || dices[1] === dices[4]) ? sum(dices) : 0
}

const full_house = (dices) => {
  dices.sort()
  return (dices[0] === dices[1] && dices[2] === dices[4]) ? sum(dices) :
         (dices[0] === dices[2] && dices[3] === dices[4]) ? sum(dices) : 0
}

const small_straight = (dices) => {
  let chk = Array(7).fill(false)
  dices.forEach((d) => { chk[d] = true })
  return (chk[1] && chk[2] && chk[3] && chk[4] ||
          chk[2] && chk[3] && chk[4] && chk[5] ||
          chk[3] && chk[4] && chk[5] && chk[6] ) ? 15 : 0
}

const large_straight = (dices) => {
  dices.sort()
  return (dices[0] + 1 === dices[1] &&
          dices[1] + 1 === dices[2] &&
          dices[2] + 1 === dices[3] &&
          dices[3] + 1 === dices[4]) ? 30 : 0
}

const yacht = (dices) => (dices.filter(x => x == dices[0]).length == 5 ? 50 : 0)

export const calc_score = [
  eyes(1), eyes(2), eyes(3), eyes(4), eyes(5), eyes(6),
  choice, four_cards, full_house, small_straight, large_straight, yacht
]