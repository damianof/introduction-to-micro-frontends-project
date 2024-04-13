import React from 'react'
import ReactDOM from 'react-dom/client'
import 'postbox'
import '../../root-styles/dist/assets/style.css'
import './index.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
