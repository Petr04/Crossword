import { useState } from 'react'
import LetterBox from './LetterBox'

function Word({word}) {
  const [coord] = useState({
    x: word.startx,
    y: word.starty,
  })
  const [axis] = useState({
    across: 'x',
    down: 'y'
  }[word.orientation])

  return (
    <>
      {Array.from(word.answer).map((c, i) => {
        const newCoord = {...coord, [axis]: coord[axis]+i}
        return <LetterBox key={`${coord.x+i}.${coord.y+i}`} {...newCoord} />
      })}
    </>
  )
}

export default Word
