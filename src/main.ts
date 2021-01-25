import { createApp } from 'vue'

import App from './App.vue'
// service-workers don't work on github-pages
// import './registerServiceWorker'
import router from './router'
import createStore from './store'

createApp(App)
  .use(createStore)
  .use(router)
  .mount('#app');
