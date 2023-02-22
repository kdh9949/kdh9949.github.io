import { sum } from './util.js'
import { calc_score } from './rule.js'

class Scoreboard {
  constructor() {
    this.scores = Array(12).fill(0)
    this.used = Array(12).fill(false)
  }

  get eyes_sum() {
    return sum(this.scores.slice(0, 6))
  }

  get total_score() {
    return sum(this.scores) + (this.eyes_sum >= 63 ? 35 : 0)
  }

  update(rule, dices) {
    this.used[rule] = true
    this.scores[rule] = calc_score[rule](dices)
  }
}

export class GameState {
  constructor(my_turn) {
    this.my_scoreboard = new Scoreboard()
    this.ai_scoreboard = new Scoreboard()
    this.my_turn = my_turn
    this.round = 1
    this.roll_left = 3
    this.dices = [0, 0, 0, 0, 0]
  }

  make_move(move) {
    if(move.type === 'roll') {
      for(let i = 0; i < move.idx.length; ++i) {
        this.dices[move.idx[i]] = 1 + Math.floor(Math.random() * 6)
      }
    }
    else {
      if(this.my_turn)
        this.my_scoreboard.update(move.rule, this.dices)
      else
        this.ai_scoreboard.update(move.rule, this.dices)
      //this.my_turn = !this.my_turn
      this.round += 1
      this.roll_left = 3
      this.dices = [0, 0, 0, 0, 0]
    }
  }

  potential_score(rule) {
    return calc_score[rule](this.dices)
  }
}