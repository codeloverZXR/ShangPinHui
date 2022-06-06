import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const HomeIndex = () => import('@/views/HomeCpns/HomeIndex.vue')
const LoginIndex = () => import('@/views/LoginCpns/LoginIndex.vue')
const RegisterIndex = () => import('@/views/RegisterCpns/RegisterIndex.vue')
const SearchIndex = () => import('@/views/SearchCpns/SearchIndex.vue')
const routes: Array<RouteRecordRaw> = [
  //配置项目加载重定向（页面打开时路由自动跳转的位置）
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: HomeIndex,
    meta: { isShowFoot: true }
  },
  {
    path: '/login',
    component: LoginIndex,
    meta: { isShowFoot: false }
  },
  {
    path: '/register',
    component: RegisterIndex,
    meta: { isShowFoot: false }
  },
  {
    path: '/search/:keyword',
    name:'search',
    component: SearchIndex,
    meta: { isShowFoot: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
