import { useState, useCallback, useMemo, useEffect } from 'react'
import useField from '../hooks/useField'
import useCellWords from '../hooks/useCellWords'
import useWords from '../hooks/useWords'
import useWordStatuses from '../hooks/useWordStatuses'
import useCurrentWord from '../hooks/useCurrentWord'
import useFocused from '../hooks/useFocused'
import Cell from './Cell'
import PositionNumber from './PositionNumber'
import checkCoord from '../lib/checkCoord'
import iterateWord from '../lib/iterateWord'
import { sum } from '../lib/array'
import '../styles/Crossword.css'

function wordIncludes(word, coord) {
  return Array.from(iterateWord(word)).some(wordCoord =>
    wordCoord[0] === coord[0] && wordCoord[1] === coord[1])
}

function Crossword({layout, theme, onWordFocus, onCellElementFocus, onCoordFocus}) {
  const [width, height] = [layout.cols, layout.rows]
  const [field, setCell, xChange, yChange] = useField(width, height, layout.result)
  const cellWords = useCellWords(width, height, layout.result)

  const words = useWords(field, layout.result, cellWords, xChange, yChange)

  const [focused, setFocused] = useFocused(cellWords)
  const currentWord = useCurrentWord(focused, cellWords)
  const delta = useMemo(
    () => currentWord !== null
      ? (currentWord.orientation === 'across' ? [1, 0] : [0, 1])
      : [0, 0],
    [currentWord]
  )
  const [focusedCellElement, setFocusedCellElement] = useState(null)


  // Provide callbacks

  useEffect(() => onCoordFocus?.(focused),
    [focused, onCoordFocus])
  useEffect(() => onWordFocus?.(currentWord),
    [currentWord, onWordFocus])
  useEffect(() => onCellElementFocus?.(focusedCellElement),
    [focusedCellElement, onCellElementFocus])


  // Word statuses

  const wordStatuses = useWordStatuses(words, currentWord, cellWords)
  const getStatusByCoord = useCallback((x, y) => {
    if (!currentWord) return null

    const words = cellWords[x][y]
    if (words.length > 1) {
      const statuses = words.map(word => wordStatuses[word.orientation][word.position])

      if (statuses.some(x => !x)) {
        return statuses.filter(Boolean)[0]
      }

      if (wordIncludes(currentWord, [x, y])) {
        return wordStatuses[currentWord.orientation][currentWord.position]
      }

      const word = words.filter(word => word.orientation === 'across')[0]
      return wordStatuses['across'][word.position]
    }
    const word = words[0]
    return wordStatuses[word.orientation][word.position]

  }, [cellWords, wordStatuses, currentWord])


  // Handle keys

  const nextByCondition = useCallback((check, delta) => {
    for (let i = 1; true; i++) {
      let nextFocused = sum(focused, delta.map(x => x * i))
      if (!checkCoord(nextFocused, cellWords)) return null

      const nextFocusedValue = field[nextFocused[0]][nextFocused[1]]
      if (nextFocusedValue === null) return null
      if (check(nextFocusedValue)) return nextFocused
    }
  }, [field, focused, cellWords])

  const handleInput = useCallback((i, j, newVal) => {
    if (newVal.length >= field[i][j].length && newVal.length > 0) {
      const nextFocused = [delta, delta.map(x => 1 - x)]
        .map(d => nextByCondition(s => s === '', d))
        .find(Boolean)

      if (nextFocused)
        setFocused( nextFocused )
    }

    setCell(i, j, newVal)
  }, [field, setCell, setFocused, delta, nextByCondition])

  const handleBackspace = useCallback((i, j) => {
    if (field[i][j] === '') {
      const deltaNegative = delta.map(x => -x)
      const nextFocused = [deltaNegative, deltaNegative.map(x => -1 - x)]
        .map(d => nextByCondition(s => s !== '', d))
        .find(Boolean)

      if (nextFocused)
        setFocused( nextFocused )
    }
  }, [field, setFocused, delta, nextByCondition])

  const handleArrow = useCallback((i, j, direction) => {
    const directionToDelta = {
      right: [1,  0],
      down:  [0,  1],
      left:  [-1, 0],
      up:    [0, -1]
    }
    const delta = directionToDelta[direction]
    const maxCoord = ['right', 'left'].includes(direction)
      ? width
      : height

    for (let i = 1; i < maxCoord; i++) {
      const nextFocused = sum(focused, delta.map(x => x * i))
      if (checkCoord(nextFocused, cellWords)) {
        setFocused(nextFocused)
        break
      }
    }

    setFocused( sum(focused, delta) )
  }, [focused, width, height, setFocused, cellWords])

  const handleKeyDown = useCallback((i, j, e) => {
    if (e.key === 'Backspace')
      handleBackspace(i, j)
    else if (e.key.slice(0, 5) === 'Arrow') {
      e.preventDefault()
      handleArrow(i, j, e.key.slice(5).toLowerCase())
    }
  }, [handleArrow, handleBackspace])


  // Render

  const containerStyle = {
    gridTemplateColumns: `repeat(${width+1}, 1fr)`,
    gridTemplateRows: `repeat(${height+1}, 1fr)`,
  }

  return (
    <div className="Crossword" style={containerStyle}>
      {field.map((row, i) =>
        row.map((val, j) => val != null &&
          <Cell
            key={`${i}.${j}`}
            value={val}
            x={i+1} y={j+1}
            focus={focused && (focused[0] === i && focused[1] === j)}
            status={
              getStatusByCoord(i, j)
            }

            onInput={newVal => handleInput(i, j, newVal)}
            onFocus={(e) => {
              setFocusedCellElement(e.target)
              setFocused([i, j])
            }}
            onBlur={() => setFocusedCellElement(null)}
            onKeyDown={e => handleKeyDown(i, j, e)}
          />
        )
      )}
      {layout.result
        .filter(word =>
          !(words.across[word.position] && words.down[word.position])
          || word.orientation === 'across'
        ).map(word => <PositionNumber
          key={`${word.orientation[0]}${word.position}`}
          theme={theme}
          word={word}
          cellWords={cellWords}
        />)
      }
    </div>
  )
}

export default Crossword
