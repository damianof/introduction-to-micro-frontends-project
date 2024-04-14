// file: microfrontend1/src/components/Counter.tsx
import { useState } from 'react'

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '8px',
  padding: '0.6em 1.2em',
  background: '#ffffff',
  color: '#000000',
  cursor: 'pointer',
}

export default function Counter() {
  const [count, setCount] = useState(0)

  const onClick = () => {
    console.log('react: counter onClick')
    setCount((count) => count + 1)
  }

  return (
    <button className="react-button" style={buttonStyle} onClick={onClick}>
      <img src="http://localhost:5001/react.svg" alt="React Logo" style={{width: '1.5rem'}}/>
      <span style={{marginLeft: '0.25rem'}}>Microfrontend1: Counter: {count}</span>
    </button>
  )
}
