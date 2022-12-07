
module.exports = {
  devServer: {
      proxy: {
          '/api': {
              target: 'http://127.0.0.1:8006',//这里填入你要请求的接口的前缀
              pathRewrite:{
                  '^/api':''//重写路径
              }
          }
      }
  }
}
