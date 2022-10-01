import { useState, useCallback } from 'react'

function useFocused(checkCoord) {
  const [focused, setFocused] = useState(null)

  const setFocusedWithCheck = useCallback(nextFocused => {
    if (checkCoord(nextFocused))
      setFocused(nextFocused)
  }, [checkCoord])

  return [focused, setFocusedWithCheck]
}

export default useFocused
