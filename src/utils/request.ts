import axios, { AxiosRequestConfig, Method } from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/cookies'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000 * 5
})
service.defaults.headers.post['Content-Type'] = 'application/json'

// Request interceptors
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = token
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  response => response,
  error => {
    Message({
      message: error.response.data.errMessage || error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export const createAPI = (
  url: string,
  method: Method = 'get',
  params: any = undefined,
  data: any = undefined
) => {
  const config: AxiosRequestConfig = {}
  config.url = url
  config.method = method
  if (params !== undefined) {
    config.params = params
  }
  if (method != 'get' && data !== undefined) {
    config.data = data
  }

  return service(config)
}

export const createFormAPI = (url: string, method: Method, data: any) => {
  const config: AxiosRequestConfig = {}
  config.url = url
  config.method = method
  config.data = data
  config.headers = {
    'Cache-Control': 'no-cache',
    // 'Content-Type': 'application/x-www-form-urlencoded'
    'Content-Type': 'multipart/form-data'
  }
  // config.responseType = 'json'
  // config.transformRequest = [
  //   function(data) {
  //     let ret = ''
  //     for (let it in data) {
  //       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  //     }
  //     return ret
  //   }
  // ]
  return service(config)
}

export default service
