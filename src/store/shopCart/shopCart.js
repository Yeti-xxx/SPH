import { reqGetShopCartList } from "../../api"
const state = {
    cartList: [],
}
const mutations = {
    GETCARTLIST(start, cartList) {
        start.cartList = cartList
    }
}
const actions = {
    // 获取购物车列表
    async getCartList({ commit }) {
        const res = await reqGetShopCartList()
        if (res.code == 200) {
            commit('GETCARTLIST', res.data)
        }

    },
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
    // cartInfoList(state){
    //     return state.
    // }
}

export default {
    state,
    mutations,
    actions,
    getters
}