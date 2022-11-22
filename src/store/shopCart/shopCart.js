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
        const res = await reqUpdateCheckedById(id, isChecked)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('修改商品状态失败'))
        }
    },

    // 删除勾选商品
    deleteAllCheckedCart({ dispatch, getters }) {
        const arrChecked = getters.cartList.cartInfoList    //获取勾选的商品
        const arrPromise = []
        arrChecked.forEach(element => {
            const resPromise = element.isChecked == 1 ? dispatch('deleteCartListById', element.skuId) : ''
            // 将每次返回的promise结果push进数组
            arrPromise.push(resPromise)
        });
        // all全成功才成功
        return Promise.all(arrPromise)
    },

    // 全选控制
    updateAllCartIsChecked({ dispatch, getters }, checked) {
        const arrPromise = []
        getters.cartList.cartInfoList.forEach(element => {
            const res = dispatch('UpdateCheckedById', { id: element.skuId, isChecked: checked })
            arrPromise.push(res)
        })
        return Promise.all(arrPromise)
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