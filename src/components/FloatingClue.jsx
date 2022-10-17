import '../styles/FloatingClue.css'

function FloatingClue({word, cellElement, parent}) {
  const visible = Boolean(cellElement)
  if (!visible) return null

  const rect = cellElement.getBoundingClientRect()
  const parentRect = parent.getBoundingClientRect()
  const rectRelative = {
    top: rect.top - parentRect.top,
    left: rect.left - parentRect.left,
    bottom: rect.bottom - parentRect.top,
    right: rect.right - parentRect.left,
  }

  const margin = 10;
  const style = {
    left: word.orientation === 'across'
      ? rectRelative.left
      : rectRelative.right + margin,
    top: word.orientation === 'across'
      ? rectRelative.bottom + margin
      : rectRelative.top,
  }

  return (
    <div className="FloatingClue" style={style}>
      { word.clue }
    </div>
  )
}

export default FloatingClue
