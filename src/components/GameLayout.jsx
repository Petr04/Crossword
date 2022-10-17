import { useState, useRef, useMemo, useEffect } from 'react'
import classNames from 'classnames'
import Crossword from './Crossword'
import FloatingClue from './FloatingClue'
import Clue from './Clue'
import '../styles/GameLayout.css'
import CrosswordAPI from '../api/CrosswordAPI'
import shuffle from '../lib/shuffle'

const clueColors = shuffle([
  '#900c3f', '#c70039', '#ff5733',
  '#ff8d1a', '#ffc300', '#eddd53',
  '#add45c', '#57c785', '#00baad',
  '#2a7b9b', '#3d3d6b', '#511849',
])

function GameLayout({cellSize, theme}) {
  const [layout, setLayout] = useState(null)
  useEffect(() => {
    CrosswordAPI.getCrossword().then(setLayout)
  }, [])

  const [currentWord, setCurrentWord] = useState(null)
  const [cellElement, setCellElement] = useState(null)

  const gameLayout = useRef(null)
  const [gameLayoutValue, setGameLayoutValue] = useState(null)
  useEffect(() => {
    setTimeout(() => setGameLayoutValue(gameLayout.current))
  }, [])

  const wordsAcross = useMemo(() => layout?.result
    ?.filter(word => word.orientation === 'across'), [layout])

  const style = useMemo(() => ({
    ['--cell-size']: cellSize + 'px'
  }), [cellSize])

  if (!layout) return null

  return (
    <div className="GameLayout" style={style} ref={gameLayout}>
      <div className="ClueContainer">
        <span className={classNames(
          'SemiTransparentText',
          'CluesHeader',
          { dark: theme === 'dark' }
        )}>
          По горизонтали
        </span>
        {wordsAcross
          .map((word, i) =>
            <Clue
              key={`${word.orientation[0]}${word.position}`}
              word={word}
              color={clueColors[i % clueColors.length]}
            />
          )
        }
      </div>
      {layout && <Crossword
        layout={layout}
        onWordFocus={setCurrentWord}
        onCellElementFocus={setCellElement}
        theme={theme}
      />}
      <div className="ClueContainer">
        <span className={classNames(
          'SemiTransparentText',
          'CluesHeader',
          { dark: theme === 'dark' }
        )}>
          По вертикали
        </span>

        {layout.result
          .filter(word => word.orientation === 'down')
          .map((word, i) =>
            <Clue
              key={`${word.orientation[0]}${word.position}`}
              word={word}
              color={clueColors[(i + wordsAcross.length) % clueColors.length]}
            />
          )
        }
      </div>

      {gameLayoutValue && <FloatingClue
        parent={gameLayoutValue}
        word={currentWord}
        cellElement={cellElement}
      />}
    </div>
  )
}

export default GameLayout
