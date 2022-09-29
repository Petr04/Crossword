import { useState, useCallback } from 'react'
import iterateWord from '../lib/iterateWord'
import { generate, change } from '../lib/array'

function genField(width, height, result, f) {
  const field = generate(width, height, null)
  for (let word of (result || [])) {
    for (let [x, y] of iterateWord(word)) {
      field[x][y] = f(field[x][y], word)
    }
  }
  return field
}

function useField(width, height, result) {
  const [field, setField] = useState(genField(width, height, result, () => ''))
  const [xChange, setXChange] = useState(null)
  const [yChange, setYChange] = useState(null)

  const setCell = useCallback((i, j, value) => {
    setField(change(field, i, j, value))
    setXChange(i)
    setYChange(j)
  }, [field])

  const [cellPositions] = useState(genField(width, height, result,
    (last, word) => ({
      orientations: last
        ? last.orientations.concat(word.orientation)
        : [word.orientation],
      positions: last
        ? last.positions.concat(word.position)
        : [word.position],
    })
  ))

  return [field, setCell, cellPositions, xChange, yChange]
}

export default useField
