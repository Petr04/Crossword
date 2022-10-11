import { useState, useCallback } from 'react'
import genField from '../lib/genField'
import { change } from '../lib/array2d'

function useField(width, height, result) {
  const [field, setField] = useState(genField(width, height, result, () => ''))
  const [xChange, setXChange] = useState(null)
  const [yChange, setYChange] = useState(null)

  const setCell = useCallback((i, j, value) => {
    setField(change(field, i, j, value))
    setXChange(i)
    setYChange(j)
  }, [field])

  return [field, setCell, xChange, yChange]
}

export default useField
