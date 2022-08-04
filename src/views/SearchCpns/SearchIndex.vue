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
  <div>
    <typeNavIndex/>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            //商品名称面包屑
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            //商品关键字面包屑
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            //商品品牌面包屑
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark }}<i @click="removeTrademark">×</i>
            </li>
            //商品规格面包屑
            <li class="with-x" v-for="(item,index) in searchParams.props" :key="index">
              {{item.split(':')[1]}}<i @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @moveToTrademark="moveToTrademark" @choseNorms="choseNorms"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active: searchParams.order.split(':')[0]=== '1'}"
                    @click="changeOrder('1')"
                >
                  <a>综合{{searchParams.order.split(':')[0]=== '1' && searchParams.order.split(':')[1]==='desc'? "↓" : "↑"
                    }}</a>
                </li>
                <li :class="{active: searchParams.order.split(':')[0]=== '2'}"
                    @click="changeOrder('2')"
                >
                  <a>价格{{searchParams.order.split(':')[0]=== '2' && searchParams.order.split(':')[1]==='desc'? "↓" : "↑"
                    }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"
                    ><img :src="item.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="item.title">{{
                      item.title
                      }}</a>
                  </div>
                  <div class="commit">
                    <i class="command"
                    >已有<span>{{ item.hotScore }}</span
                    >人评价</i
                    >
                  </div>
                  <div class="operate">
                    <a
                            href="success-cart.html"
                            target="_blank"
                            class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                    >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <pageFilter :pageNo="pageNo" :pageSize="pageSize" :total="total" :continues="5" @changePage="changePage"
                      @upPage="upPage" @downPage="downPage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  import SearchSelector from "./SearchSelector/SearchSelector.vue";
  import {computed, defineComponent, reactive, watch, ref} from "vue";
  import {useStore} from "vuex";
  import router from "@/router";
  //引入事件总线
  import emitter from "@/utils/eventBus.js";

  export default defineComponent({
    name: "SearchIndex",
    // 通过路由接收的参数(布尔) props: ['keyword'],
    // 通过路由接收的参数(对象) props:[ 'a', 'b'],
    // 通过路由接收的参数(函数) props: ['keyword', 'k', 'a'],
    components: {
      SearchSelector,
    },
    setup() {
      let store = useStore();
      const searchParams = reactive({
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      });
      //当活跃路由发生改变，就修改searchParams参数并且重新发送一次请求，改变vuex的search的数据
      //要开启立即监听
      watch(
          () => router.currentRoute,
          () => {
            //更新searchParams
            Object.assign(
                searchParams,
                router.currentRoute.value.query,
                router.currentRoute.value.params
            );
            //发送事件，更新仓库中的search数据
            store.dispatch("getSearchData", searchParams);
            //置空searchParams参数中的categoryId数据
            searchParams.category1Id = "";
            searchParams.category2Id = "";
            searchParams.category3Id = "";
          },
          {deep: true, immediate: true}
      );
      const searchData = computed(() => {
        return store.state.search.searchData;
      });
      //展示商品
      const goodsList = computed(() => {
        return store.getters.goodsList;
      });
      //删除商品面包屑
      const removeCategoryName = () => {
        //清空categoryName
        searchParams.categoryName = undefined;
        // console.log(Boolean(router.currentRoute.value.params));//true

        //判断是否有params参数keyword 有的话携带
        if (router.currentRoute.value.params) {
          router.push({
            name: "search",
            params: router.currentRoute.value.params,
          });
        }
      };
      //删除关键字面包屑
      const removeKeyword = () => {
        //清空keyword
        searchParams.keyword = undefined;
        //清空输入框内容
        emitter.emit("clearKeyword");
        //判断是否有query参数
        if (router.currentRoute.value.query) {
          router.push({
            name: "search",
            query: router.currentRoute.value.query,
          });
        }
      };
      //点击品牌图片
      const moveToTrademark = (item) => {
        searchParams.trademark = `${item.tmId}:${item.tmName}`;
        //更新仓库数据
        store.dispatch("getSearchData", searchParams);
      };
      //清除品牌面包屑
      const removeTrademark = () => {
        //清空trademark关键字
        searchParams.trademark = undefined;
        /*
          经研究，这种情况下，这两个值永远都是true，虽然在前端路由中会没有
            console.log(Boolean(router.currentRoute.value.params));
            console.log(Boolean(router.currentRoute.value.query));
        */
        //携带原来参数
        if (router.currentRoute.value.params || router.currentRoute.value.query)
          router.push({
            name: "search",
            params: router.currentRoute.value.params,
            query: router.currentRoute.value.query,
          });
        //将前端路由参数和后台请求的params融合
        Object.assign(
            searchParams,
            router.currentRoute.value.query,
            router.currentRoute.value.params
        );
        //重新发送请求，更新数据
        store.dispatch("getSearchData", searchParams);
        //置空searchParams参数中的categoryId数据
        searchParams.category1Id = "";
        searchParams.category2Id = "";
        searchParams.category3Id = "";
      };
      //选择商品规格参数
      const choseNorms = (props) => {
        if (searchParams.props.indexOf(props) === -1) {
          searchParams.props.push(props)
          store.dispatch("getSearchData", searchParams)
        }
      }
      //删除商品规格面包屑
      const removeProps = (index) => {
        searchParams.props.splice(index, 1)
        store.dispatch("getSearchData", searchParams)
      }
      //选择商品排列规则
      let flag = ref(true)
      const changeOrder = (num) => {
        flag.value = !flag.value
        let type = ''
        if (flag.value) {
          type = 'desc'
        } else {
          type = 'asc'
        }
        const order = `${num}:${type}`
        searchParams.order = order
        store.dispatch("getSearchData", searchParams)
      }
      let pageNo = ref(1)
      let total = ref(73 )
      let pageSize = ref(10)
      const changePage = function (item) {
        pageNo.value = item
      }
      const upPage = function () {
        pageNo.value = pageNo.value - 1
        if (pageNo.value < 1) {
          pageNo.value = 1
        }
      }
      const downPage = function () {
        pageNo.value  = pageNo.value + 1
        if (pageNo.value > Math.ceil(total.value / pageSize.value)){
          pageNo.value = Math.ceil(total.value / pageSize.value)
        }
      }
      return {
        searchData,
        goodsList,
        searchParams,
        removeCategoryName,
        removeKeyword,
        moveToTrademark,
        removeTrademark,
        choseNorms,
        removeProps,
        changeOrder,
        pageNo,
        changePage,
        upPage,
        downPage,
        total,
        pageSize
      };
    },
  });
</script>

<style scoped lang="less">
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>