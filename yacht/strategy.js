export const get_best_move = (used, roll_left, eyes_sum, dices) => {
  for(let i = 0; i < 12; ++i) 
    if(!used[i]) return { type: 'select', idx: i }
}