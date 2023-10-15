import { hiragana, katakana } from './const.js';
import _, { map } from './underscore.js';

const select_mode = document.getElementById("select-mode")
const question_panel = document.getElementById("question-panel")
const answer_panel = document.getElementById("answer-panel")
const message_panel = document.getElementById("message-panel")

const hira_btn = document.createElement("button")
const kata_btn = document.createElement("button")
hira_btn.innerHTML = "Hiragana"
hira_btn.addEventListener('click', () => { start_game(hiragana) })
kata_btn.innerHTML = "Katakana"
kata_btn.addEventListener('click', () => { start_game(katakana) })

select_mode.appendChild(hira_btn)
select_mode.appendChild(kata_btn)

var prob_table, prob_idx
function start_game(table) {
  select_mode.innerHTML = ""
  prob_table = _.shuffle(table)
  prob_idx = 0
  make_prob()
}

function make_prob() {
  const typ = Math.floor(Math.random() * 2)
  const was = prob_table.filter((_, i) => i != prob_idx)
  const wa = _.shuffle(was).slice(0, 5)
  const cur_prob = [prob_table[prob_idx], ...wa]

  question_panel.innerHTML = "<h1>" + cur_prob[0][typ] + "</h1>"
  let answer_btns = cur_prob.map((v, i) => {
    const btn = document.createElement("button")
    btn.innerHTML = v[1 - typ]
    btn.addEventListener("click", i == 0 ? correct : wrong_answer)
    return btn
  })
  answer_btns = _.shuffle(answer_btns)
  answer_panel.innerHTML = ""
  answer_btns.map((btn, i) => {
    answer_panel.appendChild(btn)
    if(i % 2 == 1) btn.after(document.createElement("br"))
  })
  message_panel.innerHTML = ""

  if(++prob_idx == prob_table.length) {
    prob_idx = 0
    prob_table = _.shuffle(prob_table)
  }
}

function correct() {
  message_panel.innerHTML = "Correct!"
  setTimeout(() => make_prob(), 1000)
}

function wrong_answer(e) {
  message_panel.innerHTML = e.target.innerHTML + " is Wrong Answer"
}