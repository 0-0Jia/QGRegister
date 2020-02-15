import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { DatetimePicker } from 'we-vue'
import 'we-vue/lib/style.css'
import echarts from 'echarts'


import WeVue from 'we-vue'
import { Tabs, Tab } from 'we-vue'
Vue.use(WeVue)

Vue.config.productionTip = false
Vue.use(ViewUI);
Vue.use(ElementUI);
Vue.use(DatetimePicker);
Vue.use(Tabs).use(Tab);
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
