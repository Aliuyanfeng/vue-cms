//打包入口文件

//1.导入vue
import Vue from 'vue'

//全局配置mintui
import MintUi from 'mint-ui';
//导入样式表
import 'mint-ui/lib/style.css'
Vue.use(MintUi) //批量注册

//导入mui 
import '../lib/mui/css/mui.min.css'
import '../lib/mui/css/icons-extra.css'

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

//配置axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
    baseURL:'http://api.cms.liulongbin.top'
})



import App from './components/App.vue'

const vm = new Vue({
    el: '#app',
    render(h) {
        return h(App)
    },
    router: router
})