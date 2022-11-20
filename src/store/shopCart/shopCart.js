import { reqGetShopCartList, reqDeleteCartById, reqUpdateCheckedById } from "../../api"
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
    // 删除购物车产品
    async deleteCartListById({ commit }, id) {
        const res = await reqDeleteCartById(id)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('删除商品失败'))
        }
    },

    // 修改购物车某个物品选中状态
    async UpdateCheckedById({ commit }, { id, isChecked }) {
        console.log(isChecked);
        const res = await reqUpdateCheckedById(id, isChecked)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('修改商品状态失败'))
        }
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },

}

export default {
    state,
    mutations,
    actions,
    getters
}