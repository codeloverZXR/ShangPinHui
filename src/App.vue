<template>
  <header-index-vue/>
  <router-view/>
  <foot-index-vue v-show="$route.meta.isShowFoot"/>
</template>

<script lang='ts'>
// 头部组件
import HeaderIndexVue from './components/Headercpns/HeaderIndex.vue'
import FootIndexVue from './components/Footcpns/FootIndex.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  components: {
    HeaderIndexVue,
    FootIndexVue
  },
  setup() {
    return {
    }
  },
})
</script>

<style>
</style>
