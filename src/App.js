import { useMemo } from 'react'
import { useResizeDetector } from 'react-resize-detector';
import GameLayout from './components/GameLayout'
import './App.css'

function App() {
  const { width, ref } = useResizeDetector();
  const cellSize = useMemo(() => {
    if (!width) return '50px'
    return width * .038
  }, [width])

  return (
    <div className="App">
      <div className="GameWidget" ref={ref}>
        <div className="GameField">
          <GameLayout
            cellSize={cellSize}
            theme="light" // "light" | "dark"
                          // set "dark" if bg image is dark
          />
        </div>
      </div>
    </div>
  )
}

export default App
