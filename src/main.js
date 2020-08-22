//打包入口文件

//1.导入vue
import Vue from 'vue'

import App from './components/App.vue'

const vm = new Vue({
    el:'#app',
    render(h) {
        return h(App)
    },
})