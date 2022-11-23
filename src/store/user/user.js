import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogOut } from '../../api/index.js'
import { setToken, getToken,removeToken } from '../token.js'
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERTOKEN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEARTOKEN(state){
        // 服务器退出登录成功后，本地清除信息
        state.token = ''
        state.userInfo = {}
        removeToken()
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
        if (res.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('注册失败'))
        }

    },
    // 登录
    async userLogin({ commit }, data) {
        const res = await reqUserLogin(data)
        // 此处获取token
        if (res.code == 200) {
            commit('USERTOKEN', res.data.token)
            // 持久化存储
            setToken(res.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('登录失败'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        const res = await reqUserInfo()
        if (res.code == 200) {
            commit('GETUSERINFO', res.data)
            return 'ok'
        } else {

        }
    },
    // 退出登录
    async reqLogOut({commit}) {
        const res = await reqLogOut()
        commit('CLEARTOKEN')
        if (res.code==200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('失败'))
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