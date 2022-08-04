//对所有的api接口请求进行统一管理
import requests from "./requests";
import requestByMock from "./requestByMock";
//三级联动接口
//请求地址:/api/product/getBaseCategoryList，请求方式:get，无参数
export const reqCategoryList = () => {
  return requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}
//home轮播图数据
export const reqBannerList = () => {
  return requestByMock({
    url: '/banner',
    method: 'get'
  })
}
//homefloor数据
export const reqFloorList = () => {
  return requestByMock({
    url: '/floor',
    method: 'get'
  })
}
//search数据
export const reqSearchData = (params) => {
  return requests({
    url: '/list',
    method: 'post',
    data: params
  })
}

