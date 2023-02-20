import { GameState } from './state.js'

const game_state = new GameState(true)

const table = document.getElementById('score-table')
const button = document.getElementById('test-button')
const div = document.getElementById('test-div')

let score_rows = []
for(let i = 0; i < 12; i++) {
  score_rows.push(table.rows[i + 1 + (i >= 6)])
  score_rows[i].cells[1].classList.add('not-used')
}

button.addEventListener('click', () => {
  game_state.roll([0, 1, 2, 3, 4])
  div.innerHTML = game_state.dices.toString()
  for(let i = 0; i < 12; ++i) {
    const cur_score = game_state.potential_score(i)
    score_rows[i].cells[1].innerHTML = cur_score
  }
})