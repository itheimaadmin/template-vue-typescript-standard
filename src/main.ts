import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// ElementUI
import ElementUI from 'element-ui'
Vue.use(ElementUI)

// 注册模块
import Developer from '@/module-developer'
Developer.install(router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
