import { useRef, useMemo, useEffect } from 'react'

function useCurrentWord(focused, cellWords) {
  const lastWord = useRef(null)

  const currentWord = useMemo(() => {
    if (focused === null) return null

    const words = cellWords[focused[0]][focused[1]]

    if (words.length > 1) {
      return lastWord.current
        || words.find(word => word.orientation === 'across')
    }

    return words[0]
  }, [focused, cellWords])

  useEffect(() => {lastWord.current = currentWord}, [currentWord])

  return currentWord
}

export default useCurrentWord
