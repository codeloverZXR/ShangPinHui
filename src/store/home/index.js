import { reqCategoryList } from '@/api/getRequestData.js'
const state = {
  categoryList: []
}
const getters = {}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList.data
  }
}
const actions = {
  async getCategoryList({ commit }) {
    const categoryList = await reqCategoryList()
    commit('CATEGORYLIST', categoryList)
  }
}
export const home = {
  state,
  getters,
  mutations,
  actions
}