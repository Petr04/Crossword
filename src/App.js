import { useState, useEffect } from 'react'
import './App.css'
import Crossword from './components/Crossword'
import Tip from './components/Tip'
import CrosswordAPI from './api/CrosswordAPI'

function App() {
  const [layout, setLayout] = useState(null)
  useEffect(() => {
    CrosswordAPI.getCrossword().then(setLayout)
  }, [])
  const [currentWord, setCurrentWord] = useState(null)
  const [cellElement, setCellElement] = useState(null)

  return (
    <div className="App">
      <div className="GameWidget">
        <div className="GameField">
          {layout && <Crossword
            layout={layout}
            onWordFocus={setCurrentWord}
            onCellElementFocus={setCellElement}
          />}
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
