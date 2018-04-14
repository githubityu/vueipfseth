// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import IpfsAPi  from 'ipfs-api'
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI)
Vue.prototype.ipfsapi = IpfsAPi({host:'localhost',port:'5001',protocol:'http'})
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
