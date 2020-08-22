const path = require('path')
//导入在内存中生成页面的webpack插件
const htmlWebpackPlugin = require('html-webpack-plugin')
//导入清楚dist文件夹的插件
const cleanPlugin = require('clean-webpack-plugin')
//导入webpack模块
const webpack = require('webpack')
//导入抽取css的插件
const extractTextPlugin = require('extract-text-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
//导入压缩css
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')


//使用node语法向外暴漏对象 运行时加载指定对象
// 为什么用node  因为webpack基于node创建的
module.exports = {
    entry: {
        app: "./src/main.js",
        vendors: ['jquery']
    }, //项目的入口文件
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/index.js'
    }, //打包后的我呢见输出配置
    plugins: [
        new htmlWebpackPlugin({
            //创建一个实例对象
            template: path.join(__dirname, './src/index.html'), //指定模板页面路径
            filename: "index.html",
            minify: {
                removeComments: true, //移出注释
                collapseWhitespace: true, //合并空白字符
                removeAttributeQuotes: true //移出属性节点上的引号npm
            } //提供压缩页面

        }),
        new cleanPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin({ //抽离第三方包
            name: 'vendors',
            filename: 'js/vendors.js' //指定出来的第三方包
        }),
        new webpack.optimize.UglifyJsPlugin({ //压缩js
            compress: {
                warnings: false,
            }
        }),
        new webpack.DefinePlugin({ //配置全局变量 检测webpack中有没有提供这个字段 并且名字变为production
            //移出不必要的警告包
            'process.env.NODE_ENV': "'production",
            'myvar': '"1234"'
        }),
        new extractTextPlugin('css/styles.css'),
        new optimizeCSSAssetsPlugin()
    ],
    module: {
        //配置非js文件对应的loader
        rules: [
            //就是这些非js文件和loader之间的对应关系 
            {
                //创建处理css文件的匹配规则
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                    publicPath: '../'
                })
            }, {
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader'],
                    publicPath: '../'
                })
            }, {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: '../'
                })
            }, {
                test: /\.jpg|png|gif|bmp|jfif$/,
                use: 'url-loader?limit=27944&name=images/[hash:6]-[name].[ext]' //如果只有一个可以使用单引号 不用数组
                //可以使用？给url-loader传递参数，其中，有一个固定的参数。叫做limit叫做图片的大小
            }, {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}