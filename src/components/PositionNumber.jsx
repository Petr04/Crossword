import classNames from 'classnames'
import '../styles/PositionNumber.css'

function PositionNumber({word, cellWords, theme}) {
  const style = {
    gridColumn: word.orientation === 'across'
      ? word.startx+1
      : word.startx+2,
    gridRow: word.orientation === 'down'
      ? word.starty+1
      : word.starty+2,
  }

  return (
    <div
      className={classNames('PositionNumber', { dark: theme === 'dark' })}
      style={style}
    >
      { word.position }
    </div>
  )
}

export default PositionNumber
