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
    name: 'home',
    component: HomeIndex,
    meta: { isShowFoot: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginIndex,
    meta: { isShowFoot: false }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterIndex,
    meta: { isShowFoot: false }
  },
  {
    path: '/search/:keyword?',
    name: 'search',
    component: SearchIndex,
    meta: { isShowFoot: true },

    /* 有关路由传递参数的配置 */
    //方法一：布尔值的写法 只能用于传递params参数
    // props:true
    //方法二：对象写法 可以额外给目标组件传递传递一些porps，该方法不能直接传递params参数
    // props:{
    //   a:'ha',
    //   b:'hei'
    // }
    //方法三：函数(常用)，即可以直接传递params参数，又可以直接传递query参数，还可以进行额外的参数添加
    // props: ($route) => {
    //   return { keyword: $route.params.keyword, k: $route.query.k, a: 'test' }
    // }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
