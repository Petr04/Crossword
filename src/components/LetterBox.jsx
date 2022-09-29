import { useState, useRef } from 'react'
import '../styles/LetterBox.css'

function LetterBox(params) {
  const [value, setValue] = useState(params.value || '')
  const lastValue = useRef(value)

  return (
    <div
      className="LetterBox"
      style={{gridColumn: params.x+1, gridRow: params.y+1}}
    >
      <input
        type="text"
        onInput={e => {
          const newValue = (e.target.value[0] || '').toUpperCase()
          lastValue.current = value
          if (newValue !== lastValue.current)
            params.onInput(newValue)
          setValue(newValue)
        }}
        value={value}
      />
    </div>
  )
}

export default LetterBox
