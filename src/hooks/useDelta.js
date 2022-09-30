import { useRef, useMemo, useEffect } from 'react'

function useDelta(focused, cellWords) {
  const lastDelta = useRef([1, 0])

  const delta = useMemo(() => {
    if (focused === null) return [1, 0]

    const words = cellWords[focused[0]][focused[1]]

    if (words.length > 1) {
      return lastDelta.current
    }

    const orientation = words[0].orientation
    return orientation === 'across' ? [1, 0] : [0, 1]
  }, [focused, cellWords])

  useEffect(() => {lastDelta.current = delta}, [delta])

  return delta
}

export default useDelta
