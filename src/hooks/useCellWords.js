import { useState } from 'react'
import genField from '../lib/genField'

function useCellWords(width, height, result) {
  const [cellWords] = useState(genField(width, height, result,
    (last, word) => {
      return (last || []).concat([word])
    }
  ))

  return cellWords
}

export default useCellWords
