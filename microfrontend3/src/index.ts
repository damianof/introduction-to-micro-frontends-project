// file: microfrontend3/src/index.ts
import { createApp, CreateAppFunction, Component } from 'vue'
import 'postbox'
import './style.css'
import App from './App.vue'
let appInstance: ReturnType<CreateAppFunction<Component>>

/**
 * @description
 * Ensure each micro-frontend exposes the necessary methods (mount, unmount) globally
 * to be compatible with the loader.
 * This can be done within the entry point of each micro-frontend.
 */
// @ts-ignore
window.microfrontend3 = {
  mount(containerId: string) {
    appInstance = createApp(App)
    appInstance.mount(`#${containerId}`)
  },
  unmount(containerId: string) {
    // Implement unmount logic if necessary
    if (appInstance) {
      appInstance.unmount()
    }
    const container = document.getElementById(containerId)
    if (container) {
      // Cleanup like removing event listeners, stopping timers, etc.
      container.innerHTML = '' // Clean up the container
    }
  },
}
