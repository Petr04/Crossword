import iterateWord from '../lib/iterateWord'
import { generate } from '../lib/array2d'

export default function genField(width, height, result, f) {
  const field = generate(width, height, null)
  for (let word of (result || [])) {
    for (let [x, y] of iterateWord(word)) {
      field[x][y] = f(field[x][y], word)
    }
  }
  return field
}
