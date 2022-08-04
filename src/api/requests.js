//引入axios
/* 
总结：请求后台数据
1.第一次封装axios实例：创建axios实例，并配置基本信息baseurl和timeout
2.第二次封装request请求：利用创建好的axios实例，配置具体接口地址，请求方式，传递参数
3.第三次封装function：创建获取数据的具体方法 
*/
import axios from "axios";
/* 
需求：
  1.当发送请求时，显示加载进度条
  2.当请求成功时，关闭加载进度条
解决：安装并使用nprogress插件即可
*/
//引入进度条包
import nprogress from "nprogress";
//nprogress 对象内部有两个方法: start()显示进度条,done()关闭进度条
//注意:在使用时务必要引入nprogress对应的样式，否则不会在页面中有所显示
import "nprogress/nprogress.css"
//对axios进行二次封装
//利用axios对象的create方法，创建axios实例
//创建的requests实例本质上就是axios对象，只不过有了一些基础的配置
const requests = axios.create({
  //设置基础路径，为每一个通过此方式请求的url开头添加/api路径来避免重复操作
  baseURL: '/api',
  //设置请求超时的时间为5s
  timeout: 5000
})
//定义requests实例的请求拦截器:在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  nprogress.start()
  //config：配置对象，对象里面有一个属性很重要:headers请求头
  return config
})
//定义requests实例的响应拦截器:
requests.interceptors.response.use((res) => {
  //服务器响应成功的回调函数
  nprogress.done()
  return res.data
}, (error) => {
  //服务器响应失败的回调函数
  console.log(error)
  return Promise.reject(new Error('服务器响应失败'))
})
export default requests