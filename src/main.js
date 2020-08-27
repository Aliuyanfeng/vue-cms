//打包入口文件
import './globalConfig.js'
//1.导入vue
import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

import App from './components/App.vue'

//导入状态管理对象
import store from './store.js'



const vm = new Vue({
    el: '#app',
    render(h) {
        return h(App)
    },
    router,
    store
})