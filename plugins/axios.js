import Axios from 'axios'
import Qs from 'qs'
import { Modal, message } from 'ant-design-vue'

export default function({ redirect, env, error, store }, inject) {
  // 1. 创建axios实例
  const axios = Axios.create(
    Object.assign(
      {
        baseURL: env.baseUrl,
        timeout: 300000 // 超时时间： 30s
      },
      // 数据转换
      env.transformRequest ? {
        transformRequest: [function(data) {
          return Qs.stringify(data)
        }]
      } : {}
    )
  )

  // 请求拦截器
  axios.interceptors.request.use(
    config => {
      if (store.token) {
        config.data.token = store.token
      }
      return config
    },
    error => {
      Promise.reject(error)
    }
  )

  // 响应拦截器
  axios.interceptors.response.use(
    response => {
      const res = response.data
      return env.errorCode.includes(res.code) ? Promise.reject(res) : res
    },
    error => {
      const code = error.response && error.response.status ? error.response.status.toString() : '600'
      // 错误提示
      const errMsg = new Map([
        ['403', '请求错误，您没有权限访问（403）'],
        ['404', '出错了，请求的资源好像不存在（404）'],
        ['500', '程序君走神了，请稍候重试（500）'],
        ['600', '呃，网络好像不太通畅，请检查您的网络（600）']
      ])
      const obj = {
        code,
        data: '',
        info: errMsg.get(code) || `请求发生错误，请稍候再试（${error.response.status}）`
      }
      return Promise.reject(obj)
    }
  )

  // 全局 post 方法
  inject('post', async function(url = '', data = {}, opt = {}) {
    if (url.indexOf('/') === 0) { url = url.slice(1) }
    try {
      return await axios({ url, method: 'post', ...opt, data })
    } catch (err) {
      if (err.code < 1000) { // http请求的状态码
        // axios 在服务器端运行时
        if (process.server) { error(err.info) }
        // axios 在客户端运行时
        if (process.client) { message.error(err.info) }
      } else { // 严重错误，如 token 失效，无权限等，这时需要客户重新登录
        (process.client) ? Modal.confirm(
          {
            title: err.info,
            okText: '确定',
            cancelText: '取消',
            onOk() {
              console.log('点击了确定')
            }
          }) : error(err.info)
      }
      return { code: env.nullCode, data: '', info: '请求的数据为空' }
    }
  })

  // 定义全局get方法
  inject('get', async function(url = '', params = {}, opt = {}) {
    if (url.indexOf('/') === 0) { url = url.slice(1) }
    try {
      return await axios({ url, method: 'post', ...opt, params })
    } catch (err) {
      if (err.code < 1000) { // http请求的状态码
        // axios 在服务器端运行时
        if (process.server) { error(err.info) }
        // axios 在客户端运行时
        if (process.client) { message.error(err.info) }
      } else { // 严重错误，如 token 失效，无权限等，这时需要客户重新登录
        (process.client) ? Modal.alert(
          {
            title: err.info,
            okText: '确定',
            onOk() {
              console.log('点击了确定')
            }
          }) : error(err.info)
      }
      return { code: env.nullCode, data: '', info: '请求的数据为空' }
    }
  })
}
