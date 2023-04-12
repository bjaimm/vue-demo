import Vue from 'vue'
import App from './App.vue'
import './utils/axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.prototype.$qs=qs;

Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  el: '#app'
}).$mount('#app');



