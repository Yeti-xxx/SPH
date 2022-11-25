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
import Trade from '../pages/Trade/index.vue'
import Pay from '../pages/Pay/index.vue'
import PaySuccess from '../pages/PaySuccess/index.vue'

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
        { path: '/trade', component: Trade, name: 'Trade', meta: { show: true } },
        { path: '/pay', component: Pay, name: 'Pay', meta: { show: true } },
        { path: '/paySuccess', component: PaySuccess, name: 'PaySuccess', meta: { show: true } },
    ]
})
// 路由守卫
Router.beforeEach(async (to, from, next) => {
    const token = store.state.user.token
    const name = store.state.user.userInfo.name
    if (token) {
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            // 登录了，访问的是其他页面
            if (name) {
                next()
            } else {
                // 登录了没有用户信息
                // 即路由跳转前获取用户信息
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效，重新登录
                    await store.dispatch('reqLogOut')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录
        next()
    }


})
export default Router;