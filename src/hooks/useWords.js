import { useState, useMemo } from 'react'
import iterateWord from '../lib/iterateWord'

function useOrientationWordsList(field, result, orientation) {
  const ret = {}

  for (let word of result.filter(word => word.orientation === orientation)) {
    ret[word.position] = []
    for (let [x, y] of iterateWord(word)) {
      ret[word.position].push( field[x][y] )
    }
  }

  return useState(ret)
}

function useWords(field, result, cellPositions, xChange, yChange) {
  const [hWords, setHWords] = useOrientationWordsList(field, result, 'across')
  const [vWords, setVWords] = useOrientationWordsList(field, result, 'down')

  const ret = {
    across: hWords,
    down: vWords,
  }

  return useMemo(() => {
    if (xChange === null || yChange === null)
      return ret

    const {positions, orientations} = cellPositions[xChange][yChange]

    for (let i in positions) {
      const position = positions[i]
      const orientation = orientations[i]

      const [word] = result.filter(word => word.position === position)
      const [start, changed] = orientation === 'across'
        ? [word.startx, xChange]
        : [word.starty, yChange]

      const setWords = orientation === 'across'
        ? setHWords
        : setVWords

      const newWords = {...ret[orientation]}
      newWords[position][changed - start] = field[xChange][yChange]
      setWords(newWords)
    }

    return ret
  }, [field])
}

export default useWords
