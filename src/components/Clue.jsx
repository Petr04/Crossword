import { useMemo } from 'react'
import '../styles/Clue.css'

function Clue({word, color}) {
  const style = useMemo(() => ({
    background: color,
  }), [color])

  return (
    <div className="Clue" style={style}>
      {word.position}. {word.clue}
    </div>
  )
}

export default Clue
