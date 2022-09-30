import { useState, useCallback } from 'react'
import iterateWord from '../lib/iterateWord'
import { generate, change } from '../lib/array2d'

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

  const [cellWords] = useState(genField(width, height, result,
    (last, word) => {
      return (last || []).concat([word])
    }
  ))

  return [field, setCell, cellWords, xChange, yChange]
}

export default useField
