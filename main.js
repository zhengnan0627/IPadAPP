import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//引入自建请求封装
import $request from './common/request.js'
Vue.prototype.$request = $request

//引入uview
import uView from "uview-ui";
Vue.use(uView);

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
