// api 接口
const api = {
  development: 'http://wk.sihongedu.com/api/',
  production: 'https://www.jiankao.wang/api/'
}

// 指定主机
const server = {
  port: 3333,
  host: '127.0.0.1'
}

// 站点名称
const title = 'vue-ssr-template'
// 站点说明
const keywords = 'vue SSR,vue framework,javascript,vue'
// 站点说明
const description = 'website\'s description'
// 站点icon
const icon = '/favicon.ico'

// cdn
const cdnCSS = [
  { rel: 'stylesheet', href: '//at.alicdn.com/t/font_972561_sfgf0gxls0o.css' }
]
const cdnJS = [
  { src: 'https://cdn.bootcss.com/lodash.js/4.17.11/lodash.min.js' }
]

// axios 相关设置
// 是否需要转换数据格式
const transformRequest = true
// axios 请求成功的代码
const successCode = '2000'
// axios 严重错误的代码
const errorCode = ['4003', '4005']

module.exports = {
  api,
  server,
  title,
  keywords,
  description,
  icon,
  cdnCSS,
  cdnJS,
  transformRequest,
  successCode,
  errorCode
}
