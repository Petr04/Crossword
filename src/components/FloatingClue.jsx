import '../styles/FloatingClue.css'

function FloatingClue({word, cellElement}) {
  const visible = Boolean(cellElement)
  if (!visible) return null

  const rect = cellElement.getBoundingClientRect()

  const margin = 10;
  const style = {
    position: 'absolute',
    left: word.orientation === 'across'
      ? rect.left
      : rect.right + margin,
    top: word.orientation === 'across'
      ? rect.bottom + margin
      : rect.top,
  }

  return (
    <div className="FloatingClue" style={style}>
      { word.clue }
    </div>
  )
}

export default FloatingClue
