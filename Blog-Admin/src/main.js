import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueProgressBar from 'vue-progressbar'

Vue.config.productionTip = false

Vue.use(VueProgressBar)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
