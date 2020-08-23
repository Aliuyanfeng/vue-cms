//打包入口文件
import './globalConfig.js'
//1.导入vue
import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

import App from './components/App.vue'

const vm = new Vue({
    el: '#app',
    render(h) {
        return h(App)
    },
    router: router
})