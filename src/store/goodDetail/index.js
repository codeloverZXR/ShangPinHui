import {reqGoodDetail} from "@/api/reqData.js"
const state={
  goodInfo:{}
}
const mutations={
  ADDGOODINFO(state,result){
    state.goodInfo = result.data
  }
}
const actions={
  async getGoodInfo({commit},payload){
    const result = await reqGoodDetail(payload)
    if (result.code == '200'){
      commit('ADDGOODINFO',result)
    }
  }
}
const getters={
  categoryView(state){
    return state.goodInfo.categoryView || {}
  },
  skuInfo(state){
    return state.goodInfo.skuInfo || {}
  },
  spuSaleAttrList(state){
    return state.goodInfo.spuSaleAttrList || []
  },
  valuesSkuJson(state){
    return state.goodInfo.valuesSkuJson || {}
  }
}
export const goodDetail = {
  state,
  mutations,
  actions,
  getters
}