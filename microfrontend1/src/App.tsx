// file: App.tsx
// @ts-ignore
import React, { useState } from 'react'
import Counter from './components/Counter'

// // retrieve our postbox instance from window using the usePostbox hook
// const postbox = window.usePostbox()
// // subscribe to a topic
// postbox.sub('all-modules-loaded', (data) => console.log(`microfrontend1 (react): received event`, data))

function App() {
  return (
    <div className="flex flex-col space-y-2">
      <Counter />
    </div>
  )
}

export default App
