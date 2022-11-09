// axios二次封装
import axios from 'axios'
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// start:开始  done:结束

// 创建axios实例
const request = axios.create({
    // 配置对象
    baseURL: 'http://gmall-h5-api.atguigu.cn',
    timeout: 5000
})
// 请求拦截器
request.interceptors.request.use(config => {
    nprogress.start()
    // config控制请求头
    return config
})
// 响应拦截器
request.interceptors.response.use(res => {
    nprogress.done()
    return res.data
}, err => {
    // 出错
    return  console.log(err);
})
export default request