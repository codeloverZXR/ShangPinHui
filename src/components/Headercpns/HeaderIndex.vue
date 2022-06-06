<template>
  <div class="topBar">
    <ul>
      <li><span>尚品会欢迎您!</span></li>
      <li><span>请</span><a href="javascript:;" @click="moveToLogin">登录</a>|<a href="javascript:;"
          @click="moveToRegister">免费注册</a></li>
    </ul>
    <ul>
      <li><a href="javascript:;">我的订单</a></li>
      <li class="dividingline"></li>
      <li><a href="javascript:;">我的购物车</a></li>
      <li class="dividingline"></li>
      <li><a href="javascript:;">我的尚品汇</a></li>
      <li class="dividingline"></li>
      <li><a href="javascript:;">尚品汇会员</a></li>
      <li class="dividingline"></li>
      <li><a href="javascript:;">企业采购</a></li>
      <li class="dividingline"></li>
      <li><a href="javascript:;">关注尚品会</a></li>
      <li class="dividingline"></li>
      <li><a href="javascript:;">合作招商</a></li>
      <li class="dividingline"></li>
      <li><a href="javascript:;">商家后台</a></li>
    </ul>
  </div>
  <div class="search">
    <img src="@/assets/headerImgs/logo.png" alt="" @click="moveToHome">
    <div>
      <input type="text" v-model="keyword">
      <a href="javascript:;" @click="moveToSearch">搜索</a>
    </div>
  </div>
</template>

<script lang='ts'>
import router from '@/router'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'HeaderIndex',

  setup() {
    const moveToHome = () => {
      router.push('/home')
    }
    const moveToLogin = () => {
      router.push('/login')
    }
    const moveToRegister = () => {
      router.push('/register')
    }
    //跳转到搜索页面
    //定义输入框数据变量
    const keyword = ref('')
    const moveToSearch = () => {
      //路由传递参数的三种方式:
      //params: keyword.value(输入框输入的内容)
      //query: ?k=keyword.value.toUpperCase()(输入框输入内容的大写形式)
      //方法一：字符串形式
      // router.push('/search/' + keyword.value + "?k=" + keyword.value.toUpperCase())
      //方法二：模板字符串
      router.push(`/search/${keyword.value}?k=${keyword.value.toLocaleUpperCase()}`)
      //方法三：对象(常用,需要给要跳转的路由起别名)
      // router.push({ name: 'search', params: { keyword: keyword.value }, query: { k: keyword.value.toUpperCase() } })
    }
    return {
      moveToHome,
      moveToLogin,
      moveToRegister,
      moveToSearch,
      keyword
    }
  },
})
</script>

<style scoped lang="less">
.topBar {
  width: 100%;
  background-color: #EEEEEE;
  display: flex;
  justify-content: space-between;
  line-height: 30px;

  &>:nth-child(1) {
    display: flex;
    width: 20%;
    justify-content: space-around;

    span {
      margin-right: 3px;
    }
  }

  &>:nth-child(2) {
    display: flex;
    width: 50%;
    justify-content: space-around;

    .dividingline {
      width: 1px;
      height: 24px;
      margin-top: 3px;
      background-color: red;
    }
  }
}

.search {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  img {
    margin-left: 10px;
  }

  div {
    display: flex;
    margin-right: 10px;

    input {
      height: 30px;
      width: 500px;
      box-sizing: border-box;
      border: 1px solid #FF0000;
      margin-right: 5px;
    }

    a {
      display: inline-block;
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #FF0000;
      color: #FFFFFF;
    }
  }
}
</style>