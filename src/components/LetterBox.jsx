import { useState, useRef, useEffect } from 'react'
import classNames from 'classnames';
import '../styles/LetterBox.css'

function LetterBox({defaultValue, x, y, focus, status, ...callbacks}) {
  const [value, setValue] = useState(defaultValue || '')

  const input = useRef(null)
  useEffect(
    () => focus ? input.current.focus() : input.current.blur(),
    [focus]
  )

  return (
    <div
      className={classNames(
        'LetterBox', {
          correct: status === 'correct',
          wrong: status === 'wrong',
        }
      )}
      style={{gridColumn: x+1, gridRow: y+1}}
    >
      <input
        type="text"
        ref={input}
        value={value}

        onInput={e => {
          const newValue = (e.target.value[0] || '').toUpperCase()
          callbacks.onInput(newValue)
          setValue(newValue)
        }}
        onFocus={e => {
          e.currentTarget.setSelectionRange(
            e.currentTarget.value.length, e.currentTarget.value.length
          )
          callbacks.onFocus(e)
        }}
        onBlur={callbacks.onBlur}
        onKeyDown={callbacks.onKeyDown}
      />
    </div>
  )
}

export default LetterBox
