import { useRef, useMemo, useEffect } from 'react'

function useCurrentWord(focused, cellWords) {
  const lastWord = useRef([1, 0])

  const currentWord = useMemo(() => {
    if (focused === null) return [1, 0]

    const words = cellWords[focused[0]][focused[1]]

    if (words.length > 1) {
      return lastWord.current
    }

    // const orientation = words[0].orientation
    // return orientation === 'across' ? [1, 0] : [0, 1]
    return words[0]
  }, [focused, cellWords])

  useEffect(() => {lastWord.current = currentWord}, [currentWord])

  return currentWord
}

export default useCurrentWord
