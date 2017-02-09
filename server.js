/**
 * Created by yangfan on 2017/1/25.
 * node的webpack服务器配置文件
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

// 相当于通过本地node服务代理请求
var proxy = [{
    path: '/api/*',
    target: 'https://api.tianapi.com',
    host: 'tianapi.com'
}];

//启动服务
var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    proxy: proxy,
    stats: {
        colors: true
    }
});

//将其他路由，全部返回index.html
server.app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

server.listen(3000);