import App from './App.vue'
import { createApp } from 'vue'

// Optional, since every component import their Bootstrap functionality
// the following line is not necessary
// import 'bootstrap'

const app = createApp(App)
app.mount('#app')
// createApp(App).mount('#app')