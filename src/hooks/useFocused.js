import { useState, useCallback } from 'react'
import checkCoord from '../lib/checkCoord'

function useFocused(cellWords) {
  const [focused, setFocused] = useState(null)

  const setFocusedWithCheck = useCallback(nextFocused => {
    if (checkCoord(nextFocused, cellWords))
      setFocused(nextFocused)
  }, [cellWords])

  return [focused, setFocusedWithCheck]
}

export default useFocused
