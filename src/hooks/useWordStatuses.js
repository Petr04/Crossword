import { useState, useEffect } from 'react'
import CrosswordAPI from '../api/CrosswordAPI'
import getIntersectedWords from '../lib/getIntersectedWords'

function useWordStatuses(words, currentWord, cellWords) {
  const [wordStatuses, setWordStatuses] = useState({across: {}, down: {}})

  useEffect(() => {
    if (!currentWord) return

    for (let word of [currentWord, ...getIntersectedWords(currentWord, cellWords)]) {
      const wordValue = words[word.orientation][word.position]
      CrosswordAPI.checkWord(wordValue, /* args */).then(wordStatus => {
        const newWordStatuses = {...wordStatuses}
        newWordStatuses[word.orientation][word.position] = wordStatus
        setWordStatuses(newWordStatuses)
      })
    }
  }, [words, cellWords, currentWord])

  return wordStatuses
}

export default useWordStatuses
