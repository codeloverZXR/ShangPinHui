import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import routes from "@/router/routes";
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes:routes,
  //路由跳转滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

export default router
