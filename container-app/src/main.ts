import { createApp } from 'vue'
// Import shared styles globally:
import 'http://localhost:5004/dist/assets/style.css'
// import local styles
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
