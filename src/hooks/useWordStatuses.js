import { useState, useEffect } from 'react'
import CrosswordAPI from '../api/CrosswordAPI'

function useWordStatuses(words, currentWord) {
  const [wordStatuses, setWordStatuses] = useState({across: {}, down: {}})
  useEffect(() => {
    if (!currentWord) return
    const wordValue = words[currentWord.orientation][currentWord.position]
    CrosswordAPI.checkWord(wordValue, /* args */).then(wordStatus => {
      const newWordStatuses = {...wordStatuses}
      newWordStatuses[currentWord.orientation][currentWord.position] = wordStatus
      setWordStatuses(newWordStatuses)
    })
  }, [words])
  return wordStatuses
}

export default useWordStatuses
