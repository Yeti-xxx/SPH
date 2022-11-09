import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
// 三级分类导航栏
import TypeNav from './pages/Home/TypeNav/index.vue'
// 测试
import { reqCategoryList } from './api/index.js'
reqCategoryList()
const app = createApp(App)
app.component(TypeNav.name, TypeNav)
app.use(router)
app.use(store)
app.mount('#app')
