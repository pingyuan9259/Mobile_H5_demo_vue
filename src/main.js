// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import App from './App'
import router from './router'
import Store from './store/index.js'

Vue.config.productionTip = false

Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  router,
  store: Store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
