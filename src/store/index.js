import Vuex from 'vuex'
import home from './home/index'
import search from './search/search'
import detail from './detail/index'
import shopCart from './shopCart/shopCart'
import user  from './user/user'
const store = new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopCart,
        user
    }
})
export default store