const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  //关闭eslint校验工具
  lintOnSave: false,

  //配置代理跨域
  devServer: {
    proxy: {
      //如果请求路径中有'/api'字段，则更改目标服务器
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  }
})
