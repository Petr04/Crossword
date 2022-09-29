import { Fragment } from 'react'
import useField from '../hooks/useField'
import useWords from '../hooks/useWords'
import LetterBox from './LetterBox'

function Crossword({layout}) {
  const [width, height] = [layout.cols, layout.rows] // wrap in hook
  const [field, setCell, cellPositions, xChange, yChange] =
    useField(width, height, layout.result)

  const words = useWords(field, layout.result, cellPositions, xChange, yChange)

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${width}, 1fr)`,
    gridTemplateRows: `repeat(${height}, 1fr)`,
  }

  return (
    <div style={containerStyle} className="Crossword">
      {field.map((row, i) =>
        row.map((val, j) =>
          val != null
            ? <LetterBox
                key={`${i}.${j}`}
                value={val}
                onInput={newVal => setCell(i, j, newVal)}
                x={i} y={j}
              />
            : <Fragment key={`fragment-${i}.${j}`} />
        )
      )}
    </div>
  )
}

export default Crossword
