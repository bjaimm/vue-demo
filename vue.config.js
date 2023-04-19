const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
	  proxy: {
      '/api': {//代理标识，一般是每个接口前的相同部分
        target: 'http://9.197.4.240:80', // 这里写的是访问接口的域名和端口号
        changeOrigin: true, // 允许跨域请求
        pathRewrite: { // 重写路径，替换请求地址中的指定路径
          '^/api': ''
        }
      }
    }
  }
})
