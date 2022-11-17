import { reqGetGoodInfo } from "../../api/index"
const state = {
    goodInfo: {}
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
    // 获取商品详情
    async GetGoodInfo({ commit }, skuid) {
        const res = await reqGetGoodInfo(skuid)
        if (res.code === 200) {
            commit("GETGOODINFO", res.data)
        }
    }
}
const getters = {
    // 导航信息
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    // 商品信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 商品属性
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}