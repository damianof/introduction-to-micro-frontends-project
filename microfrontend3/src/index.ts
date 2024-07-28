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
    console.log('microfrontend3 (vue): mount', containerId)
    appInstance = createApp(App)
    appInstance.mount(`#${containerId}`)
  },
  unmount(containerId: string) {
    // Implement unmount logic if necessary
    console.log('microfrontend3 (vue): unmount not implemented', containerId)
    if (appInstance) {
      console.log('microfrontend3 (vue): unmount vue app instance')
      appInstance.unmount()
    }
    const container = document.getElementById(containerId)
    if (container) {
      console.log('microfrontend3 (vue): unmount cleanup container', container.innerHTML)
      // Cleanup like removing event listeners, stopping timers, etc.
      container.innerHTML = '' // Clean up the container
    }
  },
}
