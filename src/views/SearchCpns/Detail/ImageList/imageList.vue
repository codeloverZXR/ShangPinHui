<template>
  <div class="swiper-container" ref="swipercontainer">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in skuImageList" :key="item.id">
        <img :src="item.imgUrl" :class="{active: index === activeIndex}" @click="updateImg(item.imgUrl,index)"/>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import emitter from "@/utils/eventBus";
  import {defineComponent, ref, nextTick, watch} from 'vue'

  export default defineComponent({
    name: 'imageList',
    props: {
      skuImageList: {
        type: Array,
        default() {
          return [{}]
        }
      }
    },
    setup(props) {
      let activeIndex = ref(0)
      const swipercontainer = ref(null)
      watch(
          () => props.skuImageList,
          () => {
            nextTick(() => {
              new Swiper(swipercontainer.value, {
                slidesPerView: 4,
                // 如果需要前进后退按钮
                navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                },
              })
            })
          },
          {immediate: true, deep: true}
      )
      const updateImg = function (imgUrl, index) {
        emitter.emit("updateImg", imgUrl)
        activeIndex.value = index
      }
      return {
        swipercontainer,
        updateImg,
        activeIndex
      }
    },
  })
</script>

<style lang="scss" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      & > :nth-child(1) {
        margin-left: 20px;
      }

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;

      &::after {
        font-size: 12px;
      }
    }
  }
</style>