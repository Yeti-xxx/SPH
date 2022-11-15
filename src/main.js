import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
// 三级分类导航栏
import TypeNav from './components/TypeNav/index.vue'
import Carousel from './components/Carousel/index.vue'
import Pagination from './components/pagination/index.vue'
// 在入口文件导入一次mockServe使其运行
import './mock/mockServe'
import 'swiper/css/swiper.css'
// 测试
// import { reqCategoryList } from './api/index.js'
// reqCategoryList()
const app = createApp(App)
app.component(TypeNav.name, TypeNav)
app.component(Carousel.name, Carousel)
app.component(Pagination.name, Pagination)
app.use(router)
app.use(store)
app.mount('#app')
