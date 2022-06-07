<template>
  <!-- 导入三级分类全局组件 -->
  <type-nav-index />
  <!-- 导入其它组件 -->
  <list-container-index-vue />
  <today-recommend-index-vue />
  <rank-index-vue />
  <like-index/>
  <floor-index/>
  <brand-index/>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
//导入其它组件
import listContainerIndexVue from "./listContainer/listContainerIndex.vue";
import todayRecommendIndexVue from "./todayRecommend/todayRecommendIndex.vue";
import likeIndex from "./like/likeIndex.vue";
import rankIndexVue from "./rank/rankIndex.vue";
import floorIndex from "./floor/floorIndex.vue"
import brandIndex from "./brand/brandIndex.vue"
export default defineComponent({
  components: {
    listContainerIndexVue,
    todayRecommendIndexVue,
    rankIndexVue,
    likeIndex,
    floorIndex,
    brandIndex
  },
  name: "HomeIndex",
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>
