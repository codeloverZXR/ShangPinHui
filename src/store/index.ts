import { createStore } from 'vuex'
import { home } from './home/index.js'
import { search } from './search/index.js'
import { goodDetail } from './goodDetail/index.js'
export default createStore({
  modules: {
    home,
    search,
    goodDetail
  }
})
