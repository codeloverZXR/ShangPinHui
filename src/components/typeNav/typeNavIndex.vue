<template>
  <div class="type-nav">
    <div class="container" @mouseleave="resetActiveIndex">
      <h2 class="all" @mouseenter="openAllGoodsList">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!-- 添加vue内置动画组件 -->
      <transition name="sortall">
        <div
          class="sort"
          @click="moveToSearch"
          ref="allGoods"
          @mouseleave="closeAllGoodsList"
          v-show="isShow"
        >
          <div class="all-sort-list2">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              @mouseenter="chamgeActiveIndex(index)"
              :class="{ isActive: activeIndex === index }"
            >
              <h3>
                <a
                  href="javascript:;"
                  :data-category-name="c1.categoryName"
                  :data-category1id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div
                class="item-list clearfix"
                :style="{ display: activeIndex == index ? 'block' : 'none' }"
              >
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <a
                        href="javascript:;"
                        :data-category-name="c2.categoryName"
                        :data-category2id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          href="javascript:;"
                          :data-category-name="c3.categoryName"
                          :data-category3id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, ref } from "vue";
//lodash下的throttle节流函数，由于它是默认导出的，所以不需要使用{}
import throttle from "lodash/throttle";
import { useStore } from "vuex";
import router from "@/router";
export default defineComponent({
  name: "typeNavIndex",
  setup() {
    const store = useStore();
    let categoryList = computed(() => {
      return store.state.home.categoryList;
    });
    //定义动态显示鼠标移入背景索引
    let activeIndex = ref(-1);
    //定义鼠标移入修改activeIndex函数
    //将该回调函数变为节流函数，避免用户移入元素过快造成卡顿
    // throttle中的回调函数尽量不要使用箭头函数，否则会引起this指针上下文的问题
    const chamgeActiveIndex = throttle(function (index) {
      activeIndex.value = index;
    }, 50);
    //定义鼠标移出重置activeIndex的函数
    const resetActiveIndex = () => {
      activeIndex.value = -1;
    };
    /* 
    路由跳转方案
    1.使用声明式导航<router-link/>
      缺点:要对每个a标签进行组件替换，当页面加载时，要加载多次该组件，会占用大量内存
    2.使用编程式导航
      (1)给a直接回调函数，还是要创建多个回调函数，浪费资源
      (2)利用事件委派，直接给所有a标签的父组件添加回调函数，再通过巧妙配置，动态区分到底是点击了哪个a标签,进行相应的路由跳转
    */
    const moveToSearch = (event) => {
      //1.判断点击的是不是a标签,解决:给所有a动态的添加自定义属性
      /* 注意：
            1.自定义属性必须以data-开头命名，且dataset获取的自定义属性data-不在它的名字里面 
            2.标签属性中的属性名大写统统采用-大写字母的形式
      */
      //获取到所点击的那个元素
      const element = event.target;
      //获取到自定义的属性和值
      let { categoryName, category1id, category2id, category3id } =
        element.dataset;
      if (categoryName) {
        //保存路由信息
        let location = { name: "search" };
        let query = { categoryName: categoryName };
        //2.判断是哪个分页的a标签并把相应标签分页的信息添加到query对象
        if (category1id) {
          query["category1Id"] = category1id;
        } else if (category2id) {
          query["category2Id"] = category2id;
        } else {
          query["category3Id"] = category3id;
        }
        //将query添加到location对象中
        location["query"] = query;
        //如果当前的路由中有params参数，则跳转的search组件中时，location也要携带
        if (router.currentRoute.value.params) {
          location["params"] = router.currentRoute.value.params;
        }
        //根据配置好的location进行跳转
        router.push(location);
      }
    };
    //非home页中鼠标移入类列表展示业务
    //方法一：动态添加类：缺点：无法添加过渡动画
    //获取目标元素,只能在onMounted组件挂载完成的回调中获取，其它位置获取是undefined
    /*     
    const allGoods = ref();
    onMounted(() => {
      //如果不是/home路由
      if (router.currentRoute.value.name != "home") {
        allGoods.value.classList.add("moving");
      }
    });
    //鼠标移入全部商品
    const openAllGoodsList = () => {
      if (router.currentRoute.value.name != "home") {
        allGoods.value.classList.remove("moving");
      }
    };
    //鼠标移出全部商品
    const closeAllGoodsList = () => {
      if (router.currentRoute.value.name != "home") {
        allGoods.value.classList.add("moving");
      }
    }; 
    */
    //方法二:利用vue中的v-show
    //注：在vue中，内置过渡动画的设置必须要有v-if或v-show的修饰或组件本身是动态组件才能正常使用
    //定义一个变量来决定全部商品列表是否显示
    const isShow = ref(true);
    if (router.currentRoute.value.name != "home") {
      isShow.value = false;
    }
    const openAllGoodsList = () => {
      if (router.currentRoute.value.name != "home") {
        isShow.value = true;
      }
    };
    const closeAllGoodsList = () => {
      if (router.currentRoute.value.name != "home") {
        isShow.value = false;
      }
    };
    return {
      categoryList,
      activeIndex,
      chamgeActiveIndex,
      resetActiveIndex,
      moveToSearch,
      // allGoods,
      isShow,
      openAllGoodsList,
      closeAllGoodsList,
    };
  },
});
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }
    // .moving {
    //   display: none;
    // }
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 510px;
      position: absolute;
      background: #fcefe8;
      z-index: 999;
      a {
        text-decoration: none;
      }

      .all-sort-list2 {
        .isActive {
          background-color: #e3f9fd;
        }
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            a {
              color: #333;
              &:hover {
                color: #0081ff !important;
              }
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
    //定义vue动画的样式
    //动画开始阶段
    .sortall-enter-from {
      height: 0px;
    }
    //动画结束阶段
    .sortall-enter-to {
      height: 510px;
    }
    //定义动画的执行时间,速率
    .sortall-enter-active {
      transition: all 0.7s linear;
    }
  }
}
</style>