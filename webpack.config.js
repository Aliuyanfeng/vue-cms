const path = require('path')
//导入在内存中生成页面的webpack插件
const htmlWebpackPlugin = require('html-webpack-plugin')
//使用node语法向外暴漏对象 运行时加载指定对象
// 为什么用node  因为webpack基于node创建的
module.exports = {
    entry: "./src/main.js", //项目的入口我呢见
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    }, //打包后的我呢见输出配置
    plugins: [
        new htmlWebpackPlugin({
            //创建一个实例对象
            template: path.join(__dirname, './src/index.html'), //指定模板页面路径
            filename: "index.html"

        })
    ],
    module: {
        //配置非js文件对应的loader
        rules: [
            //就是这些非js文件和loader之间的对应关系 
            {
                //创建处理css文件的匹配规则
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }, {
                test: /\.jpg|png|gif|bmp|jfif$/,
                use: 'url-loader?limit=27944&name=[hash:6][name].[ext]' //如果只有一个可以使用单引号 不用数组
                //可以使用？给url-loader传递参数，其中，有一个固定的参数。叫做limit叫做图片的大小
            }, {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.vue$/,
                use: 'vue-loader'
            }, {
                test: /\.ttf|woff|woff2|eot|svg$/,
                use: 'url-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    }
}