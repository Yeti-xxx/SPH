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
export const reqGetFloorList = () =>{
    return mockRequest({url:'/floor',method:'GET'})
}