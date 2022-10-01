import { useCallback } from 'react'
import useField from '../hooks/useField'
import useWords from '../hooks/useWords'
import useDelta from '../hooks/useDelta'
import useFocused from '../hooks/useFocused'
import LetterBox from './LetterBox'
import { sum, sub } from '../lib/array'

function Crossword({layout}) {
  const [width, height] = [layout.cols, layout.rows] // wrap in hook
  const [field, setCell, cellWords, xChange, yChange] =
    useField(width, height, layout.result)

  const checkCoord = useCallback(coord =>
    Boolean((cellWords[coord[0]] || [])[coord[1]]),
    [cellWords]
  )

  const words = useWords(field, layout.result, cellWords, xChange, yChange)

  const [focused, setFocused] = useFocused(checkCoord)
  const delta = useDelta(focused, cellWords)

  const handleInput = useCallback((i, j, newVal) => {
    if (newVal.length >= field[i][j].length && newVal.length > 0) {
      setFocused( sum(focused, delta) )
    }

    setCell(i, j, newVal)
  }, [delta, field, focused, setCell, setFocused])

  const handleBackspace = useCallback((i, j) => {
    if (field[i][j] === '') {
      setFocused( sub(focused, delta) )
    }
  }, [delta, field, focused, setFocused])

  const handleArrow = useCallback((i, j, direction) => {
    const directionToDelta = {
      right: [1,  0],
      down:  [0,  1],
      left:  [-1, 0],
      up:    [0, -1]
    }
    const delta = directionToDelta[direction]
    const maxCoord = ['right', 'left'].includes(direction)
      ? layout.cols
      : layout.rows

    for (let i = 1; i < maxCoord; i++) {
      const nextFocused = sum(focused, delta.map(x => x * i))
      if (checkCoord(nextFocused)) {
        setFocused(nextFocused)
        break
      }
    }

    setFocused( sum(focused, delta) )
  }, [checkCoord, focused, layout.cols, layout.rows, setFocused])

  const handleKeyDown = useCallback((i, j, e) => {
    if (e.key === 'Backspace')
      handleBackspace(i, j)
    else if (e.key.slice(0, 5) === 'Arrow') {
      e.preventDefault()
      handleArrow(i, j, e.key.slice(5).toLowerCase())
    }
  }, [handleArrow, handleBackspace])

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
