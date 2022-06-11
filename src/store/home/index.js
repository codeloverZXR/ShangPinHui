import { reqCategoryList, reqBannerList } from '@/api/getRequestData.js'
const state = {
  categoryList: [],
  bannerList: []
}
const getters = {}
const mutations = {
  ADDCATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList.data
  },
  ADDBANNERLIST(state, bannerList) {
    state.bannerList = bannerList.data
  }
}
const actions = {
  async getCategoryList({ commit }) {
    const categoryList = await reqCategoryList()
    commit('ADDCATEGORYLIST', categoryList)
  },
  async getBannerList({ commit }) {
    const bannerList = await reqBannerList()
    if (bannerList.code == 200) {
      commit('ADDBANNERLIST', bannerList)
    }
  }
}
export const home = {
  state,
  getters,
  mutations,
  actions
}