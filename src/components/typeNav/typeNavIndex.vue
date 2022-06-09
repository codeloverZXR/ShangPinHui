<template>
  <div class="type-nav">
    <div class="container" @mouseleave="resetActiveIndex">
      <h2 class="all">全部商品分类</h2>
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
      <div class="sort" @click="moveToSearch">
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
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, onMounted, ref } from "vue";
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
    onMounted(() => {
      store.dispatch("getCategoryList");
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
      console.log(element.dataset.categoryName);
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
        //根据配置好的location进行跳转
        router.push(location);
      }
    };
    return {
      categoryList,
      activeIndex,
      chamgeActiveIndex,
      resetActiveIndex,
      moveToSearch,
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

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .isActive {
          background-color: #bfa;
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
  }
}
</style>