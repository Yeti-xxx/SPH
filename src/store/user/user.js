import { reqGetCode, reqUserRegister } from '../../api/index.js'
const state = {
    code: ''
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    // 用户注册
    USERREGISTER() {

    }
}
const actions = {
    async getCode({ commit }, phone) {
        const res = await reqGetCode(phone)
        if (res.code == 200) {
            commit('GETCODE', res.data)
        } else {
            return Promise.reject(new Error('获取验证码失败'))
        }
    },
    // 注册
    async userRegister({ commit }, data) {
        const res = await reqUserRegister(data)
        if (res.code===200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('注册失败'))
        }

    }
}
const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}