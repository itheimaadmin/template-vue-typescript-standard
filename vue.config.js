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
  }
}
