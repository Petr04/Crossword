import { useState } from 'react'
import { generateLayout } from 'crossword-layout-generator'
import './App.css'
import Crossword from './components/Crossword'
import Tip from './components/Tip'

const exampleInput = [
  { clue: 'Что ты читаешь на уроке?', answer: 'учебник' },
  { clue: 'Куда ты записываешь, что задали?', answer: 'дневник' },
  { clue: 'В чём ты делаешь уроки?', answer: 'тетрадь' },
  { clue: 'Чем ты пишешь?', answer: 'ручка' },
  { clue: 'Чем ты рисуешь?', answer: 'карандаш' },
  { clue: 'Где ты хранишь ручки и карандаши?', answer: 'пенал' },

  // { clue: '', answer: 'abc' },
  // { clue: '', answer: 'ade' },
  // { clue: '', answer: 'ert' },
]

function getPreparedLayout(layout) {
  return {
    cols: layout.cols,
    rows: layout.rows,
    result: layout.result.map(word => ({
      startx: word.startx-1,
      starty: word.starty-1,
      clue: word.clue,
      length: word.answer.length,
      position: word.position,
      orientation: word.orientation,
    }))
  }
}

function App() {
  const [layout] = useState(generateLayout(exampleInput))
  const [currentWord, setCurrentWord] = useState(null)
  const [cellElement, setCellElement] = useState(null)

  return (
    <div className="App">
      <div className="GameWidget">
        <div className="GameField">
          <Crossword
            layout={getPreparedLayout(layout)}
            onWordFocus={setCurrentWord}
            onCellElementFocus={setCellElement}
          />
          <Tip
            word={currentWord}
            cellElement={cellElement}
          />
        </div>
      </div>
    </div>
  )
}

export default App
