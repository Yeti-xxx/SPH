//配置路由
import { createRouter, createWebHashHistory } from "vue-router";
// 引入组件
import Home from '../pages/Home/index.vue'
import Search from '../pages/Search/index.vue'
import Login from '../pages/Login/index.vue'
import Register from '../pages/Register/index.vue'

const Router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home, name: 'Home', meta: { show: true } },
        // 可以在占位参数加'?',表示该参数可传可不传
        { path: '/search/:keyword?', component: Search, name: 'Search', meta: { show: true } },
        { path: '/login', component: Login, name: 'Login', meta: { show: false } },
        { path: '/register', component: Register, name: 'Register', meta: { show: false } },
    ]
})
export default Router;