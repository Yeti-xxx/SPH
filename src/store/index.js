import Vuex from 'vuex'
import home from './home/index'
import search from './search/search'
import detail from './detail/index'
import shopCart from './shopCart/shopCart'
import user  from './user/user'
import trade from './trade/trade'
const store = new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopCart,
        user,
        trade
    }
})
export default store