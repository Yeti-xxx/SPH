import Vuex from 'vuex'
import home from './home/index'
import search from './search/search'

const store = new Vuex.Store({
    modules: {
        home, 
        search
    }
})
export default store