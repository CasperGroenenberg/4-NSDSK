import Vue from 'vue'
import App from './App.vue'

import './quasar.js'
import '@/styles/quasar.scss'

import router from '@/router'

Vue.use(router)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
