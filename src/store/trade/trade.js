import { reqAddressInfo, reqOrderInfo } from "../../api"
const state = {
    address: [],
    orderInfo:{}
}
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}
const actions = {
    // 获取用户地址
    async getUserAddress({ commit }) {
        const res = await reqAddressInfo()
        if (res.code == 200) {
            commit('GETUSERADDRESS', res.data)
        }
    },
    // 获取用户商品清单
    async getOrderInfo({ commit }) {
        const res = await reqOrderInfo()
        if (res.code==200) {
            commit('GETORDERINFO',res.data)
        }
    }

}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}