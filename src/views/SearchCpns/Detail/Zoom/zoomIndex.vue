<template>
  <div class="spec-preview" @mousemove="changeMagnifier">
    <img :src="showImgUrl"/>
    <div class="event"></div>
    <div class="big">
      <img :src="showImgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="magnifier"></div>
  </div>
</template>

<script>
  import {defineComponent, onMounted, ref, reactive, computed, watch} from 'vue'
  import emitter from "@/utils/eventBus";

  export default defineComponent({
    name: 'zoomIndex',
    props: {
      skuImageList: {
        type: Array,
        default() {
          return [{}]
        }
      }
    },
    setup(props) {
      // let showImgUrl = computed(() => {
      //   return props.skuImageList[0].imgUrl
      // })
      let showImgUrl = ref('')
      watch(() => props.skuImageList, (newValue, oldValue) => {
        showImgUrl.value = props.skuImageList[0].imgUrl
      })

      onMounted(() => {
        emitter.on("updateImg", (imgUrl) => {
          showImgUrl.value = imgUrl
        })
      })
      //放大镜
      const magnifier = ref(null)
      const bigImg = ref(null)
      const changeMagnifier = function (event) {
        let left = event.offsetX - magnifier.value.offsetWidth / 2
        let top = event.offsetY - magnifier.value.offsetHeight / 2
        if (left <= 0) {
          left = 0
        }
        if (left >= magnifier.value.offsetWidth) {
          left = magnifier.value.offsetWidth
        }
        if (top <= 0) {
          top = 0
        }
        if (top >= magnifier.value.offsetHeight) {
          top = magnifier.value.offsetHeight
        }
        magnifier.value.style.left = left + 'px'
        magnifier.value.style.top = top + 'px'
        bigImg.value.style.left = -2 * left + 'px'
        bigImg.value.style.top = -2 * top + 'px'
      }
      return {
        showImgUrl,
        magnifier,
        bigImg,
        changeMagnifier
      }
    },
  })
</script>

<style lang="scss" scoped>
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover ~ .mask,
    .event:hover ~ .big {
      display: block;
    }
  }
</style>