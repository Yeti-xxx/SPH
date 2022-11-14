import { reqGetBannerList, reqGetSearchInfo } from "../../api/index"
const state = {
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    // 获取search数据
    async getSearchList({ commit }, params = {}) {
        const res = await reqGetSearchInfo(params)
        if (res.code === 200) {
            commit('GETSEARCHLIST', res.data)
        }
    }
}
const getters = {
    goodsList(state) {
        return state.searchList.goodsList||[]
    },
    trademarkList(state) {
        return state.searchList.trademarkList||[]
    },
    attrsList(state) {
        return state.searchList.attrsList||[]
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}