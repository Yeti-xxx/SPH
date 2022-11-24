// 管理api接口
import request from "./request"
import mockRequest from './mock'

// 获取三级联动接口
export const reqCategoryList = () => {
    // 发起请求
    return request({ url: '/api/product/getBaseCategoryList', method: 'GET' })
}

// 获取轮播图接口
export const reqGetBannerList = () => {
    // 这里需要使用新封装的mockRequest
    return mockRequest({ url: '/banner', method: 'GET' })
}

// 获取floor轮播图接口
export const reqGetFloorList = () => {
    return mockRequest({ url: '/floor', method: 'GET' })
}

// 获取搜索详情
export const reqGetSearchInfo = (params) => {
    return request({ url: '/api/list', method: 'POST', data: params })
}

// 获取商品详情
export const reqGetGoodInfo = (skuid) => {
    return request({ url: '/api/item/' + skuid, method: 'GET' })
}

// 商品添加到购物车中
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return request({ url: `/api/cart/addToCart/${skuId}/${skuNum}`, method: 'POST' })
}

// 获取购物车列表
export const reqGetShopCartList = () => {
    return request({ url: '/api/cart/cartList', method: 'GET' })
}

// 删除购物车产品
export const reqDeleteCartById = (id) => {
    return request({ url: '/api/cart/deleteCart/' + id, method: 'DELETE' })
}

// 修改商品选中状态
export const reqUpdateCheckedById = (id, isChecked) => {
    return request({ url: '/api/cart/checkCart/' + id + '/' + isChecked, method: 'GET' })
}

// 发送验证码
export const reqGetCode = (phone) => {
    return request({ url: '/api/user/passport/sendCode/' + phone, method: 'GET' })
}

// 注册账号
export const reqUserRegister = (data) => {
    return request({ url: '/api/user/passport/register', data, method: 'POST' })
}

// 登录
export const reqUserLogin = (data) => {
    return request({ url: '/api/user/passport/login', data, method: 'POST' })
}

// token获取用户信息
export const reqUserInfo = () => {
    return request({ url: '/api/user/passport/auth/getUserInfo', method: 'GET' })
}

// 退出登录
export const reqLogOut = () => {
    return request({ url: '/api/user/passport/logout', method: 'GET' })
}

// 获取用户地址信息
export const reqAddressInfo = () => {
    return request({ url: '/api/user/userAddress/auth/findUserAddressList', method: 'GET' })
}

// 获取商品清单
export const reqOrderInfo = () => {
    return request({ url: '/api/order/auth/trade', method: 'GET' })
}