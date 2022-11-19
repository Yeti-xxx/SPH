// axios二次封装
import axios from 'axios'
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// start:开始  done:结束
// 引入store
import store from '../store/index'
// 创建axios实例
const request = axios.create({
    // 配置对象
    baseURL: 'http://gmall-h5-api.atguigu.cn',
    timeout: 5000
})
// 请求拦截器
request.interceptors.request.use(config => {
    // 为请求头添加字段，实现游客身份验证
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
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
    return console.log(err);
})
export default request