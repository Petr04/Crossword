import { useState, useRef, useEffect } from 'react'
import '../styles/LetterBox.css'

function LetterBox(params) {
  const [value, setValue] = useState(params.value || '')

  const input = useRef(null)
  useEffect(
    () => params.focus ? input.current.focus() : input.current.blur(),
    [params]
  )

  return (
    <div
      className="LetterBox"
      style={{gridColumn: params.x+1, gridRow: params.y+1}}
    >
      <input
        type="text"
        ref={input}
        value={value}

        onInput={e => {
          const newValue = (e.target.value[0] || '').toUpperCase()
          params.onInput(newValue)
          setValue(newValue)
        }}
        onFocus={e => {
          e.currentTarget.setSelectionRange(
            e.currentTarget.value.length, e.currentTarget.value.length
          )
          params.onFocus(e)
        }}
        onBlur={params.onBlur}
        onKeyDown={params.onKeyDown}
      />
    </div>
  )
}

export default LetterBox
