/**
 * Date: 12/7/20
 */
 const path = require('path');
 const autoprefixer = require('autoprefixer');
 const pxtorem = require('postcss-pxtorem');
 
 module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
     publicPath: '/',
     configureWebpack: {
         resolve: {
             alias: {
                 '@': path.join(__dirname, 'src')
             }
         },
         devtool: process.env.NODE_ENV === 'development' ? '#eval-source-map' : ''
     },
     devServer: {
         clientLogLevel: 'warning', //
         historyApiFallback: true, //
         hot: true, //
         compress: true, //
         open: true,
         overlay: {
             warnings: false,
             errors: true
         },
         publicPath: '/',
         quiet: true, //
         proxy: {
               '/order2pdf/': {
                  // target: 'http://120.48.154.236:9021/pbReport/servlet',                   
                   target: 'http://123.60.15.228:8523/pbReport/servlet',
                   pathRewrite: { '^/order2pdf/': '/' }
               },
               
               '/api/ccp-uaa/': {
                 target: 'http://123.60.15.228:8523/api',//target: 'http://172.16.0.164:9999',
                 pathRewrite: { '^/api/ccp-uaa/': '/ccp-uaa/' }
               },
               '/api/ccp-system/': {
                 target: 'http://123.60.15.228:8523/api',// target: 'http://172.16.0.164:9023',
                 pathRewrite: { '^/api/ccp-system/': '/ccp-system/' }
               },
               /* '/api/tscp-information/': {
                 target: 'http://172.16.0.164:9026',
                 pathRewrite: { '^/api/tscp-information/': '/tscp-information/' }
               },
               '/api/tscp-homeconfig/': {
                 target: 'http://172.16.0.164:9022',
                 pathRewrite: { '^/api/tscp-homeconfig/': '/tscp-homeconfig/' }
               }, */
               '/api/tscp-enterprise/': {
                 logLevel: 'debug',
                 // 测试环境网关
                 target: 'http://123.60.15.228:8866',
                 //target: 'http://localhost:9025',
                 pathRewrite: { '^/api/tscp-enterprise/': '/tscp-enterprise/' }
               },
               '/api/tscp-operating/': {
                 logLevel: 'debug',
                 changeOrigin: true,
                 target: 'http://123.60.15.228:8866/',//  target: 'http://123.60.70.111:8866/tscp-operating/login', // 通过网关
                 pathRewrite: { '^/api/tscp-operating/': '/tscp-operating/' },         
               },
               '/pbReport/': {
                 target: 'http://123.60.15.228:8523/api',//  target: 'http://172.16.0.164:9021'
               },
               '/reportApi/': {
                 target: 'http://123.60.15.228:8523/api',//  target: 'http://172.16.0.164:8866',
                 pathRewrite: { '^/reportApi/': '/' }
               },
               '/api/tscp-filesystem/': {
                 target: 'http://123.60.15.228:8523/api',// target: 'http://172.16.0.164:9090',
                 pathRewrite: { '^/api/tscp-filesystem/': '/tscp-filesystem/' }
               },
         },
     
         watchOptions: {
             poll: false
         }
     },
     css: {
         loaderOptions: {
             postcss: {
                 plugins: [
                     autoprefixer(),
                     pxtorem({
                         rootValue: 37.5,
                         propList: ['*']
                     })
                 ]
             }
         }
     }
 };
 