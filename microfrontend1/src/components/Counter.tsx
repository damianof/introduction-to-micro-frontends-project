// file: microfrontend1/src/components/Counter.tsx
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  const onClick = () => {
    setCount((count) => count + 1)
  }

  return (
    <button className="p-2 flex space-x-2 items-center rounded-md bg-slate-700" onClick={onClick}>
      <img src="http://localhost:5001/react.svg" alt="React Logo" style={{ width: '1.5rem' }} />
      <span style={{ marginLeft: '0.25rem' }}>Microfrontend1: Counter: {count}</span>
    </button>
  )
}
