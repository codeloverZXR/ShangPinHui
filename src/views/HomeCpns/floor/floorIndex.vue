<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ myFloorList.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li
              class="active"
              v-for="item in myFloorList.navList"
              :key="item.text"
            >
              <a :href="item.url" data-toggle="tab">{{ item.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="item in myFloorList.keywords" :key="item">
                  {{ item }}
                </li>
              </ul>
              <img :src="myFloorList.imgUrl" />
            </div>
            <div class="floorBanner">
              <!-- 引入轮播图全局组件 -->
              <carousel-index :list="myFloorList.carouselList" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="myFloorList.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="myFloorList.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="myFloorList.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="myFloorList.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="myFloorList.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "floorIndex",
  props: {
    myFloorList: {
      default: Object,
      required: true,
    },
  },
  setup() {
    // console.log(props.myFloorList, "xxx");//有值
    //获取ref节点
    // const floorSwiper = ref(null);
    /* onMounted(() => {
      //挂载时DOM已经是我们想要的哪个DOM了
      //原因：
      //一开始组件挂载时myFloorList就有值的关键:它是已经经历过父组件的floorList循环遍历出来的item
      //经测试，如果直接传floorList不经过遍历，则子组件获取到的值一开始是空的，必须要经过watch监听结合nextTick才能有效
      new Swiper(floorSwiper.value, {
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
    }); */
    return {
      // floorSwiper,
    };
  },
});
</script>

<style scoped lang ="less">
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>