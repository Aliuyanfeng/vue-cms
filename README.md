#Vue-cms

#路漫漫其修远兮，吾将上下而求索

##哈哈  我修改了readme

##首页的九宫格布局使用grid-default布局

##实现路由的切换动画
1.控制组件进入效果
  使用transition把容器包裹起来
2.组件离开的运动方向位-100% 进入位100%  页面设置绝对定位

##完成新闻资讯列表的路由配置 
1.创建页面
2.设置路由连接
3.添加路由对应规则

##对新闻列表页进行布局
1.使用mui中的media-list
2.flex布局实现中间留白

##展示新闻列表数据
1.当页面加载完毕之后，就要去获取页面数据，因此，应该在created调用获取函数
2.在methods中定义获取列表的方法
3.async和await 特性
4.获取到数据后 通过v-for循环到页面把数据挂载到data

##定义全局的时间过滤器格式化时间字符串
1.Vue.filter('dataformat',funciton(datastr))
2.调用过滤器的语法`{{item.add_time | dataformat}}`
3.moment插件 定义在mainjs

##以模块化的思想抽离main.js中代码
1.filter.js  配置全局过滤器
2.globalConfig.js   全局配置 比如axios mui 
3.在mainjs引入即可使用

##新闻列表跳转 新闻详情
1.添加组件
2.routerlink  :to传值id   字符串拼接
3.添加路由规则
4.获得路由传递参数  使用路由的props属性 在组件中 定义props:['id']

##渲染新闻详情
1.获取数据
2.挂在数据

##评论子组件的封装和引用
1.创建子组件 
2.在需要的页面内script节点中通过import引入组件  components注册子组件

##获取评论内容
1.父子传值  父组件给子组件传id 通过id查找评论
2.定义新闻的页码  

##点击加载更多的评论
1.绑定点击四件
2.page++
3.获得data后要拼接 而不是赋值  contact(data.message)

##实现发表评论的功能 
1.在点击发表评论按钮的时候 处理函数 做验证
2在和客户端存放一个评论对象 unshift进去

##改造图片分享的路由跳转 
1.新建组件
2.路由连接
3.添加路由规则

##实现图片分享列表中的顶部的滑动区域
1.严格模式下的冲突问题
安装包解决  控制台wanging 提示  利用全局css样式
`* {
  touch-action: pan-y;
}`