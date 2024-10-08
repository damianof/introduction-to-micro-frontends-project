// file: microfrontend1/src/index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'postbox'
import './index.css'
import App from './App.tsx'

/**
 * @description
 * Ensure each micro-frontend exposes the necessary methods (mount, unmount) globally
 * to be compatible with the loader.
 * This can be done within the entry point of each micro-frontend.
 */
// @ts-ignore
window.microfrontend1 = {
  mount(containerId: string) {
    ReactDOM.createRoot(document.getElementById(containerId)!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  },
  unmount(containerId: string) {
    // Implement unmount logic if necessary
    console.log('microfrontend1 (react): unmount not yet implemented', containerId)
    const container = document.getElementById(containerId)
    if (container) {
      // Cleanup like removing event listeners, stopping timers, ReactDOM.unmountComponentAtNode, etc.
      // ReactDOM.unmountComponentAtNode(document.getElementById(containerId))
      container.innerHTML = '' // Clean up the container
    }
  },
}
