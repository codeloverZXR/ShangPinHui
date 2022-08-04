<template>
  <div class="swiper-container" id="floor1Swiper" ref="swipercontainer">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in list" :key="item.id">
        <img :src="item.imgUrl"/>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script lang='ts'>
  import {defineComponent, ref, watch, nextTick} from "vue";
  import Swiper from "swiper";
  import "swiper/css/swiper.css";

  export default defineComponent({
    name: "carouselIndex",
    props: {
      list: {
        default: Array,
        require: true,
      },
    },
    setup(props) {
      const swipercontainer = ref(null);
      watch(
          () => props.list,
          () => {
            // console.log("new", newValue, "old", oldValue);
            nextTick(() => {
              new Swiper(swipercontainer.value, {
                // direction: "vertical", // 垂直切换选项
                loop: true, // 循环模式选项
                autoplay: true,

                // 如果需要分页器
                pagination: {
                  el: ".swiper-pagination",
                },

                // 如果需要前进后退按钮
                navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                },
              });
            });
          },
          {immediate: true, deep: true}
      );
      return {
        swipercontainer,
      };
    },
  });
</script>

<style scoped>
</style>