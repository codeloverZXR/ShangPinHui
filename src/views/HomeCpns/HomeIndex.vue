<template>
  <!-- 导入三级分类全局组件 -->
  <type-nav-index />
  <!-- 导入其它组件 -->
  <list-container-index-vue :bannerList="bannerList" />
  <today-recommend-index-vue />
  <rank-index-vue />
  <like-index />
  <floor-index v-for="item in floorList" :key="item.id" :myFloorList="item" />
  <test-index :test="floorList" />
  <brand-index />
</template>

<script lang='ts'>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

//导入其它组件
import listContainerIndexVue from "./listContainer/listContainerIndex.vue";
import todayRecommendIndexVue from "./todayRecommend/todayRecommendIndex.vue";
import likeIndex from "./like/likeIndex.vue";
import rankIndexVue from "./rank/rankIndex.vue";
import floorIndex from "./floor/floorIndex.vue";
import brandIndex from "./brand/brandIndex.vue";
import testIndex from "./floor/testIndex.vue";
export default defineComponent({
  components: {
    listContainerIndexVue,
    todayRecommendIndexVue,
    rankIndexVue,
    likeIndex,
    floorIndex,
    brandIndex,
    testIndex,
  },
  name: "HomeIndex",
  setup() {
    const store = useStore();
    //为方便数据的统一管理,将home子组件的所有要从store仓库中取出的数据都放到该组件中统一获取并通过父子组件通信的形式传递
    //获取bannerList数据
    let bannerList = computed(() => {
      return store.state.home.bannerList;
    });
    //获取所有floorList数据
    let floorList = computed(() => {
      return store.state.home.floorList;
    });
    console.log(bannerList, floorList);
    return {
      bannerList,
      floorList,
    };
  },
});
</script>

<style scoped>
</style>
