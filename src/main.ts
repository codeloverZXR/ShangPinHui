import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//将导航条设置为全局组件
import typeNavIndex from '@/components/typeNav/typeNavIndex.vue'
//将轮播图设置为全局组件
import carouselIndex from '@/components/Carousel/carouselIndex.vue'
//将分页器注册为全局组件
import pageFilter from "@/components/Pagefilter/pageFilter.vue";
//引入swiper的css样式
// import "swiper/css/swiper.css"
//引入mockServe
import "@/mock/mockServe.js"
//vue3将typeNavIndex三级分页组件注册为全局组件
//参数说明：第一个参数:全局组件的名称，第二个参数:具体的哪一个组件
createApp(App).use(store).use(router).component(typeNavIndex.name, typeNavIndex).component(carouselIndex.name, carouselIndex).component(pageFilter.name, pageFilter).mount('#app')


