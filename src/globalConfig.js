import Vue from 'vue'

//全局配置mintui
import MintUi from 'mint-ui';
//导入样式表
import 'mint-ui/lib/style.css'
Vue.use(MintUi) //批量注册

//导入mui 
import '../lib/mui/css/mui.min.css'
import '../lib/mui/css/icons-extra.css'
import './filters'
//配置axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
    baseURL: 'http://api.cms.liulongbin.top'
})