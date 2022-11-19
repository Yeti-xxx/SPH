import { v4 as uuidv4 } from 'uuid';
export const getUUID = () => {
    // 生成一个uuid 持久存储 并且生成后不能改变
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 如果没有就生成
    if (!uuid_token) {
        uuid_token = uuidv4()
        // 存储
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token

}