// 管理api接口
import request from "./request"

// 获取三级联动接口
export const reqCategoryList = () => {
    // 发起请求
    return request({ url: '/api/product/getBaseCategoryList', method: 'GET' })
}