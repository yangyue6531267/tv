// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import VueLazyImage from '../src/tool/lazyLoad/index.js'
import keyDo from '../src/components/keyCode/index.js'
import Promise from 'es6-promise'
require('es6-promise').polyfill()
Promise.polyfill()

Vue.use(keyDo)
Vue.use(VueLazyImage, { debounce: 200 })
const isDebugMode = process.env.NODE_ENV !== 'production';

Vue.config.debug = isDebugMode
Vue.config.devtools = isDebugMode
Vue.config.productionTip = isDebugMode

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

router.beforeEach((to, from, next) => {
  const toRoute = to.path;
  const fromeRoute = from.path;
  let h = JSON.parse(sessionStorage.getItem(toRoute));
  console.log(h);
  if (h && h.history) {
    h.history = false;
    sessionStorage.removeItem(toRoute);
  } else {
    sessionStorage.setItem(fromeRoute || '/', JSON.stringify({
      history:true,
    }))
  }
  next();
})