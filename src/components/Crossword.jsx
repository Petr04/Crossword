import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import useField from '../hooks/useField'
import useWords from '../hooks/useWords'
import LetterBox from './LetterBox'
import { sum } from '../lib/array'

function Crossword({layout}) {
  const [width, height] = [layout.cols, layout.rows] // wrap in hook
  const [field, setCell, cellPositions, xChange, yChange] =
    useField(width, height, layout.result)

  const words = useWords(field, layout.result, cellPositions, xChange, yChange)

  const [focused, setFocused] = useState(null)
  const lastFocused = useRef(null)

  const lastDelta = useRef([1, 0])

  const delta = useMemo(() => {
    if (focused === null) return [1, 0]

    const {positions, orientations} = cellPositions[focused[0]][focused[1]]

    if (orientations.length > 1) {
      return lastDelta.current
    }

    const orientation = orientations[0]
    return orientation === 'across' ? [1, 0] : [0, 1]
  }, [focused, cellPositions])

  useEffect(() => {lastDelta.current = delta}, [delta])

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${width}, 1fr)`,
    gridTemplateRows: `repeat(${height}, 1fr)`,
  }

  const handleInput = useCallback((i, j, newVal) => {
    if (newVal.length >= field[i][j].length && newVal.length > 0) {
      const nextFocused = sum(focused, delta)
      if (cellPositions[nextFocused[0]][nextFocused[1]]) {
        setFocused(nextFocused)
      }
    }

    setCell(i, j, newVal)
  })

  return (
    <div style={containerStyle} className="Crossword">
      {field.map((row, i) =>
        row.map((val, j) => val != null &&
          <LetterBox
            key={`${i}.${j}`}
            value={val}
            onInput={newVal => handleInput(i, j, newVal)}
            onFocus={() => {
              lastFocused.current = focused
              setFocused([i, j])
            }}
            focus={focused && (focused[0] === i && focused[1] === j)}
            x={i} y={j}
          />
        )
      )}
    </div>
  )
}

export default Crossword
