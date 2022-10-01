import { useRef, useMemo, useEffect } from 'react'

function useCurrentWord(focused, cellWords) {
  const lastWord = useRef([1, 0])

  const currentWord = useMemo(() => {
    if (focused === null) return [1, 0]

    const words = cellWords[focused[0]][focused[1]]

    if (words.length > 1) {
      return lastWord.current
    }

    return words[0]
  }, [focused, cellWords])

  useEffect(() => {lastWord.current = currentWord}, [currentWord])

  return currentWord
}

export default useCurrentWord
