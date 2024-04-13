// file: microfrontend2/src/index.ts
import { mount } from 'svelte'
import 'postbox'
import './app.css'
import App from './App.svelte'

/**
 * @description
 * Ensure each micro-frontend exposes the necessary methods (mount, unmount) globally
 * to be compatible with the loader.
 * This can be done within the entry point of each micro-frontend.
 */
// @ts-ignore
window.microfrontend2 = {
  mount(containerId: string) {
    mount(App, {
      target: document.getElementById(containerId)!,
    })
  },
  unmount(containerId: string) {
    // Implement unmount logic if necessary
    console.log('microfrontend2 (svelte): unmount not yet implemented', containerId)
    const container = document.getElementById(containerId)
    if (container) {
      // Cleanup like removing event listeners, stopping timers, etc.
      container.innerHTML = '' // Clean up the container
    }
  },
}
