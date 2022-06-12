import { reqCategoryList, reqBannerList, reqFloorList } from '@/api/getRequestData.js'
const state = {
  categoryList: [],
  bannerList: [],
  floorList: []
}
const getters = {}
const mutations = {
  ADDCATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList.data
  },
  ADDBANNERLIST(state, bannerList) {
    state.bannerList = bannerList.data
  },
  ADDFLOORLIST(state, floorList) {
    state.floorList = floorList.data
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
  },
  async getFloorList({ commit }) {
    const floorList = await reqFloorList()
    if (floorList.code == 200) {
      commit('ADDFLOORLIST', floorList)
    }
  }
}
export const home = {
  state,
  getters,
  mutations,
  actions
}