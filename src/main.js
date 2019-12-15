// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import store from './store/store'
import MyPlugin from './plugins/MyPlugin'

Vue.use(Vuetify, {
  theme: {
    primary: '#1A8FE7',
    secondary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.accent3,
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

Vue.use(MyPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
