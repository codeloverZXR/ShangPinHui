<template>
  <div>
   params:{{$route.params.keyword}} 
   query:{{$route.query.k}}
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SearchIndex',
  setup() {
    return {
    }
  },
})
</script>

<style scoped>
</style>