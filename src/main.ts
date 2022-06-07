import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import typeNavIndex from '@/views/HomeCpns/typeNav/typeNavIndex.vue'
//vue3将typeNavIndex三级分页组件注册为全局组件
//参数说明：第一个参数:全局组件的名称，第二个参数:具体的哪一个组件
createApp(App).use(store).use(router).component(typeNavIndex.name, typeNavIndex).mount('#app')


