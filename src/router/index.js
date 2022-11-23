//配置路由
import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store/index";
// 引入组件
import Home from '../pages/Home/index.vue'
import Search from '../pages/Search/index.vue'
import Login from '../pages/Login/index.vue'
import Register from '../pages/Register/index.vue'
import Detail from '../pages/Detail/index.vue'
import Addsucc from '../pages/AddSuccess/index.vue'
import ShopCart from '../pages/shopCart/index.vue'
const Router = createRouter({
    history: createWebHashHistory(),
    // 添加滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { top: 0 }
    },
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home, name: 'Home', meta: { show: true } },
        // 可以在占位参数加'?',表示该参数可传可不传
        { path: '/search/:keyword?', component: Search, name: 'Search', meta: { show: true } },
        { path: '/login', component: Login, name: 'Login', meta: { show: true } },
        { path: '/register', component: Register, name: 'Register', meta: { show: true } },
        { path: '/detail/:skuid', component: Detail, name: 'Detail', meta: { show: true } },
        { path: '/addsucc', component: Addsucc, name: 'Addsucc', meta: { show: true } },
        { path: '/shopCart', component: ShopCart, name: 'ShopCart', meta: { show: true } },
    ]
})
// 路由守卫
Router.beforeEach((to, from, next) => {
    const token = store.state.user.token
    if (token) {
        if (to.path == '/login'||to.path=='/register') {
            next('/')
        }else{
            next()
        }
    } else {
        // 未登录
        next()
    }
    

})
export default Router;