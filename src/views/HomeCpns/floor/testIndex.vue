<template>
  <div></div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "testIndex",
  props: {
    test: {
      default: Object,
      required: true,
    },
  },
  setup(props) {
    console.log(props.test,'test');
    return {};
  },
});
</script>

<style scoped>
</style>