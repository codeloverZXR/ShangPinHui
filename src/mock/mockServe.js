//引入mock插件
import Mock from 'mockjs'
//引入JSON文件
//在webpack中，图片和JSON数据格式都是默认对外暴露的
import banner from './banner.json'
import floor from './floor.json'
//mock方法参数1:参数请求地址 参数2:请求数据JSON
//首页轮播图数据
Mock.mock("/mock/banner", { code: 200, data: banner })
//底部楼层数据
Mock.mock("/mock/floor", { code: 200, data: floor })