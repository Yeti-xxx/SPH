import Vuex from 'vuex'
import home from './home/index'
import search from './search/search'
import detail from './detail/index'
const store = new Vuex.Store({
    modules: {
        home,
        search,
        detail
    }
})
export default store