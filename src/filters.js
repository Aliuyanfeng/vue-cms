//1.导入vue
import Vue from 'vue'
//格式化时间
import Moment from 'moment'
//定义全局事件过滤器
Vue.filter('dataformat', function (datestr, formatstr = 'YYYY-MM-DD HH:mm:ss') {
    //过滤器处理函数中 最后必须return出去
    return Moment(datestr).format(formatstr)
})