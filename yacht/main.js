import { GameState } from './state.js'

const game_state = new GameState(true)

const score_table = document.getElementById('score-table')
const dice_table = document.getElementById('dice-table')
const button = document.getElementById('roll-button')
const div = document.getElementById('test-div')

div.innerHTML = "Round 1/12 | 내 차례 | 남은 굴리기 횟수 : 3"

score_table.addEventListener('click', (e) => {
  if(game_state.roll_left === 3) return
  if(e.target.cellIndex !== 1) return
  let cur = e.target.parentNode.rowIndex
  if(cur < 1 || cur == 7 || cur > 13) return
  cur -= (cur > 7 ? 2 : 1)
  if(game_state.my_scoreboard.used[cur]) return
  game_state.make_move({type: 'select', rule: cur})
  score_rows[cur].cells[1].classList.remove('not-used')
  for(let i = 0; i < 5; ++i) {
    dice_table.rows[0].cells[i].innerHTML = ""
  }
  for(let i = 0; i < 12; ++i) {
    const cur_score =
      (game_state.my_scoreboard.used[i] ?
       game_state.my_scoreboard.scores[i] : "")
    score_rows[i].cells[1].innerHTML = cur_score
  }
  bonus_row.cells[1].innerHTML = game_state.my_scoreboard.eyes_sum + ' / 63'
  total_row.cells[1].innerHTML = game_state.my_scoreboard.total_score
  button.disabled = false
  div.innerHTML = "Round " + game_state.round + "/12 | "
  div.innerHTML += (game_state.my_turn ? "내 차례 | " : "AI 차례 | ")
  div.innerHTML += "남은 굴리기 횟수 : " + game_state.roll_left
})
let score_rows = []
for(let i = 0; i < 12; i++) {
  score_rows.push(score_table.rows[i + 1 + (i >= 6)])
  score_rows[i].cells[1].classList.add('not-used')
}
const bonus_row = score_table.rows[7]
const total_row = score_table.rows[14]
bonus_row.cells[1].innerHTML = bonus_row.cells[2].innerHTML = '0 / 63'
total_row.cells[1].innerHTML = total_row.cells[2].innerHTML = '0'

for(let i = 0; i < 5; ++i) {
  dice_table.rows[0].cells[i].addEventListener('click', (e) => {
    if(!game_state.my_turn) return
    if(game_state.roll_left !== 3) e.target.classList.toggle('selected')
  });
}

button.addEventListener('click', () => {
  let selected_idx = []
  for(let i = 0; i < 5; ++i)
    if(game_state.dices[i] === 0 || dice_table.rows[0].cells[i].classList.contains('selected'))
      selected_idx.push(i)
  if(selected_idx.length === 0) return
  game_state.make_move({type: 'roll', idx: selected_idx})
  game_state.roll_left -= 1
  div.innerHTML = "Round " + game_state.round + "/12 | "
  div.innerHTML += (game_state.my_turn ? "내 차례 | " : "AI 차례 | ")
  div.innerHTML += "남은 굴리기 횟수 : " + game_state.roll_left
  for(let i = 0; i < 5; ++i) {
    const cur_cell = dice_table.rows[0].cells[i]
    cur_cell.innerHTML = game_state.dices[i]
    cur_cell.classList.remove('selected')
  }
  for(let i = 0; i < 12; ++i) {
    const cur_score =
      (game_state.my_scoreboard.used[i] ?
       game_state.my_scoreboard.scores[i] :
       game_state.potential_score(i))
    score_rows[i].cells[1].innerHTML = cur_score
  }
  if(game_state.roll_left === 0) button.disabled = true
})