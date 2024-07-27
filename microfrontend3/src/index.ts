import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// retrieve our postbox instance from window using the usePostbox hook
let postbox = window.usePostbox()
postbox.sub('all-modules-loaded', (params) => console.log('vue: sub: ', params))

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
    createApp(App).mount(`#${containerId}`)
  },
  unmount(containerId: string) {
    // Implement unmount logic if necessary
    console.log('microfrontend3 (vue): unmount not implemented', containerId)
    const container = document.getElementById(containerId)
    if (container) {
      // Cleanup like removing event listeners, stopping timers, etc.
      container.innerHTML = ''  // Clean up the container
    }
  }
}
