// 引入mockjs模拟数据
import MOCK from 'mockjs'
// 引入编辑好的数据
import banner from './banner.json'
import floor from './floor.json'

// 第一个参数为请求地址，第二个为提供的数据
MOCK.mock('/mock/banner', { code: 200, data: banner })  //模拟轮播图
MOCK.mock('/mock/floor', { code: 200, data: floor })