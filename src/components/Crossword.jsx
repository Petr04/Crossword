import { useState, useCallback } from 'react'
import useField from '../hooks/useField'
import useWords from '../hooks/useWords'
import LetterBox from './LetterBox'
import useDelta from '../hooks/useDelta'
import { sum, sub } from '../lib/array'

function Crossword({layout}) {
  const [width, height] = [layout.cols, layout.rows] // wrap in hook
  const [field, setCell, cellWords, xChange, yChange] =
    useField(width, height, layout.result)

  const words = useWords(field, layout.result, cellWords, xChange, yChange)

  const [focused, setFocused] = useState(null)
  const delta = useDelta(focused, cellWords)

  const handleInput = useCallback((i, j, newVal) => {
    if (newVal.length >= field[i][j].length && newVal.length > 0) {
      const nextFocused = sum(focused, delta)
      if ((cellWords[nextFocused[0]] || [])[nextFocused[1]])
        setFocused(nextFocused)
    }

    setCell(i, j, newVal)
  })

  const handleKeyDown = useCallback((i, j, e) => {
    if (e.key === 'Backspace' && field[i][j] === '') {
      const nextFocused = sub(focused, delta)
      if ((cellWords[nextFocused[0]] || [])[nextFocused[1]])
        setFocused(nextFocused)
    }
  })

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${width}, 1fr)`,
    gridTemplateRows: `repeat(${height}, 1fr)`,
  }

  return (
    <div className="Crossword" style={containerStyle}>
      {field.map((row, i) =>
        row.map((val, j) => val != null &&
          <LetterBox
            key={`${i}.${j}`}
            value={val}
            x={i} y={j}
            focus={focused && (focused[0] === i && focused[1] === j)}

            onInput={newVal => handleInput(i, j, newVal)}
            onFocus={() => {
              setFocused([i, j])
            }}
            onKeyDown={e => handleKeyDown(i, j, e)}
          />
        )
      )}
    </div>
  )
}

export default Crossword
