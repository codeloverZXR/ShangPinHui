<template>
  <header-index-vue />
  <router-view />
  <foot-index-vue v-show="$route.meta.isShowFoot" />
</template>

<script lang='ts'>
// 头部组件
import HeaderIndexVue from "./components/Headercpns/HeaderIndex.vue";
import FootIndexVue from "./components/Footcpns/FootIndex.vue";
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "App",
  components: {
    HeaderIndexVue,
    FootIndexVue,
  },
  setup() {
    //创建store实例
    const store = useStore();
    //性能考虑
    //由于App.vue组件只加载一次，所以为了避免反复请求，只请求一次数据到vuex仓库即可
    onMounted(() => {
      //获取商品分类数据
      store.dispatch("getCategoryList");
      //获取首页轮播图数据
      store.dispatch("getBannerList")
      //获取首页floor数据
      store.dispatch("getFloorList")
    });
    
    return {};
  },
});
</script>

<style>
</style>
