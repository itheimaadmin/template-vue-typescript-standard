import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/iconfont/iconfont.js'
import '@/assets/iconfont/icon.css'

Vue.config.productionTip = false

import Element from 'element-ui'
import './scss/element-ui/element-variables.scss'
Vue.use(Element)

import User from './module-user'
User.install(router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
