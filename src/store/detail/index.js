import { reqGetGoodInfo, reqAddOrUpdateShopCart } from "../../api/index"
const state = {
    goodInfo: {},
    imgIndex: 0
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    },
    CHANGEIMGINDEX(state, imgIndex) {
        state.imgIndex = imgIndex
    }
}
const actions = {
    // 获取商品详情
    async GetGoodInfo({ commit }, skuid) {
        const res = await reqGetGoodInfo(skuid)
        if (res.code === 200) {
            commit("GETGOODINFO", res.data)
        }
    },
    // 添加购物车
    async AddShopCart({ commit }, { skuId, skuNum }) {
        const res = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (res.code === 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('加入购物车失败'))
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