import { createApp } from 'vue'
import App from './App.vue'

import router from './utils/routes'

createApp(App)
  .use(router)
  .mount('#app')
