import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// comment this out:
// createApp(App).mount('#app')

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
  }
}
