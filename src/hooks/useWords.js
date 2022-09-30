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

function useWords(field, result, cellWords, xChange, yChange) {
  const [hWords, setHWords] = useOrientationWordsList(field, result, 'across')
  const [vWords, setVWords] = useOrientationWordsList(field, result, 'down')

  const ret = {
    across: hWords,
    down: vWords,
  }

  return useMemo(() => {
    if (xChange === null || yChange === null)
      return ret

    const words = cellWords[xChange][yChange]

    for (let word of words) {
      const [start, changed] = word.orientation === 'across'
        ? [word.startx, xChange]
        : [word.starty, yChange]

      const setWords = word.orientation === 'across'
        ? setHWords
        : setVWords

      const newWords = {...ret[word.orientation]}
      newWords[word.position][changed - start] = field[xChange][yChange]
      setWords(newWords)
    }

    return ret
  }, [field])
}

export default useWords
