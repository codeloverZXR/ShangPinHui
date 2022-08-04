import { reqSearchData } from "@/api/reqData.js"
const state = {
  searchData: {}
}
const mutations = {
  GETSEARCHDATA(state, searchData) {
    state.searchData = searchData
  }
}
const actions = {
  async getSearchData({ commit }, params = {}) {
    const result = await reqSearchData(params)
    if (result.code == 200) {
      commit('GETSEARCHDATA', result.data)
    }
  }
}
const getters = {
  //这个state拿到的是当前仓库的state
  attrsList(state){
    //返回一个空数组，避免报错
    return state.searchData.attrsList || []
  },
  goodsList(state){
    return state.searchData.goodsList || []
  },
  trademarkList(state){
    return state.searchData.trademarkList || []
  }
}
export const search = {
  state,
  mutations,
  actions,
  getters
}