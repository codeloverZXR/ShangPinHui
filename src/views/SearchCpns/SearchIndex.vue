<template>
 <!-- 笔记测试  -->
  <!-- <div class="note">
    params:{{ $route.params.keyword }}
    <br>
    query:{{ $route.query.k }}
    <br>
     通过路由接收的参数(布尔){{ keyword }} 
     通过路由接收的参数(对象){{a}},{{b}} 
     通过路由接收的参数(函数){{ keyword }},{{ k }},{{ a }} 
  </div> -->
  <typeNavIndex/>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SearchIndex',
  // 通过路由接收的参数(布尔) props: ['keyword'],
  // 通过路由接收的参数(对象) props:[ 'a', 'b'],
  // 通过路由接收的参数(函数) props: ['keyword', 'k', 'a'],
  setup() {
    return {
    }
  },
})
</script>

<style scoped>
</style>