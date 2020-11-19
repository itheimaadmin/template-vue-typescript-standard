module.exports = {
  devServer: {
    open: false,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_SERVER_API_URL,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'vue + ts 代码规范示例'
      return args
    })
  }
}
