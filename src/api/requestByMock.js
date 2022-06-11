//封装对mock数据的axios请求
import axiox from "axios"
//引入进度条
import nProgress from "nprogress"
//引入进度条样式
import "nprogress/nprogress.css"
const requestByMock = axiox.create({
  baseURL: '/mock',
  timeout: 5000
})
requestByMock.interceptors.request.use((config) => {
  nProgress.start()
  return config
})
requestByMock.interceptors.response.use((result) => {
  nProgress.done()
  return result.data
}, (error) => {
  console.log(error)
  return Promise.reject(new Error('服务器响应失败'))
})
export default requestByMock