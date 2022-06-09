//对所有的api接口请求进行统一管理
import requests from "./requests";

//三级联动接口
//请求地址:/api/product/getBaseCategoryList，请求方式:get，无参数
export const reqCategoryList = () => {
  return requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}
