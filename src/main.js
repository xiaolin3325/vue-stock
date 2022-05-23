import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import './assets/global.css'
import axios from 'axios'
import * as Echarts from 'echarts'
Vue.prototype.$echarts = Echarts
Vue.prototype.$http = axios
axios.defaults.baseURL = "https://api.cjpy.top"
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
