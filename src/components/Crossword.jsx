import { useCallback, useMemo } from 'react'
import useField from '../hooks/useField'
import useCellWords from '../hooks/useCellWords'
import useWords from '../hooks/useWords'
import useWordStatuses from '../hooks/useWordStatuses'
import useCurrentWord from '../hooks/useCurrentWord'
import useFocused from '../hooks/useFocused'
import LetterBox from './LetterBox'
import checkCoord from '../lib/checkCoord'
import iterateWord from '../lib/iterateWord'
import { sum } from '../lib/array'

function wordIncludes(word, coord) {
  return Array.from(iterateWord(word)).some(wordCoord =>
    wordCoord[0] === coord[0] && wordCoord[1] === coord[1])
}

function Crossword({layout}) {
  const [width, height] = [layout.cols, layout.rows] // wrap in hook
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

  const wordStatuses = useWordStatuses(words, currentWord)
  const getStatusByCoord = useCallback((x, y) => {
    if (!currentWord) return 'default'

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

  const nextByCondition = useCallback((check, delta) => {
    for (let i = 1; true; i++) {
      const nextFocused = sum(focused, delta.map(x => x * i))
      if (!checkCoord(nextFocused, cellWords)) return null

      const nextFocusedValue = field[nextFocused[0]][nextFocused[1]]
      if (nextFocusedValue === null) return null
      if (check(nextFocusedValue)) return nextFocused
    }
  }, [field, focused, cellWords])

  const handleInput = useCallback((i, j, newVal) => {
    if (newVal.length >= field[i][j].length && newVal.length > 0) {
      const nextFocused = nextByCondition(s => s === '', delta)
      if (nextFocused)
        setFocused( nextFocused )
    }

    setCell(i, j, newVal)
  }, [field, setCell, setFocused, delta, nextByCondition])

  const handleBackspace = useCallback((i, j) => {
    if (field[i][j] === '') {
      const nextFocused = nextByCondition(s => s !== '', delta.map(x => -x))
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
            status={
              getStatusByCoord(i, j)
            }

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
