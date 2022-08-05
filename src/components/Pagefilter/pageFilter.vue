<template>
  <div id="pagefilter">
    <ul class="page-list">
      <li>当前页共{{pageSize}}条数据</li>
      <li>
        <button @click="upPage">上一页</button>
      </li>
      <li v-if="pageNo > 3">...</li>
      <li v-for="item in continuePage" :key="item">
        <button @click="changePage(item)" :class="{isactive:item === pageNo}">{{item}}</button>
      </li>
      <li v-if="pageNo < totalPage - 2">...</li>
      <li>
        <button @click="downPage">下一页</button>
      </li>
      <li>一共有{{totalPage}}页,{{total}}条数据</li>
    </ul>
  </div>
</template>

<script lang='ts'>
  import {computed, defineComponent, reactive} from 'vue'

  export default defineComponent({
    name: 'pageFilter',
    props: {
      //当前页码数
      pageNo: {
        type: Number,
        required: true
      },
      //每页页码展示的条数
      pageSize: {
        type: Number,
        required: true
      },
      //一共有多少条数据
      total: {
        type: Number,
        required: true
      },
      //连续有几页页码显示
      continues: {
        type: Number,
        required: true
      }
    },
    setup(props, {emit}) {
      //计算分页器的总页数
      let totalPage = computed(() => {
        return Math.ceil(props.total / props.pageSize)
      })
      let startAndend = computed(() => {
        let start = 0
        let end = 0
        //如果总页码数小于要展示的页码数
        if (totalPage.value <= props.continues) {
          start = 1
          end = totalPage.value
          console.log(end)
        } else {
          //起始位置是当前页减去展示页数除2向下取整
          start = props.pageNo - Math.floor(props.continues / 2)
          //页末位置是当前页加上展示页数除2向下取整
          end = props.pageNo + Math.floor(props.continues / 2)
          if (start < 1) {
            start = 1
            end = props.continues
          }
          if (end > totalPage.value) {
            end = totalPage.value
            start = totalPage.value - props.continues + 1
          }
        }
        return {start, end}
      })
      let continuePage = computed(() => {
        let continuePage1 = []
        if (totalPage.value > props.continues){
          continuePage1[0] = startAndend.value.start
          continuePage1[props.continues - 1] = startAndend.value.end
          for (let i = 0; i < props.continues; i++) {
            if (i != 0 || i != props.continues - 1) {
              continuePage1[i] = startAndend.value.start + i
            }
          }
        }else {
          for (let i = 0; i < totalPage.value; i++ ){
            continuePage1[i] = i + 1
          }
        }
        return continuePage1
      })
      const changePage = function (item) {
        emit('changePage',item)
      }
      const upPage = function () {
        console.log('hi')
        emit('upPage')
      }
      const downPage = function () {
        emit('downPage')
      }
      return {
        totalPage,
        startAndend,
        continuePage,
        changePage,
        upPage,
        downPage
      }
    },
  })
</script>

<style scoped lang="scss">
  .isactive{
    background-color: #4cb9fc !important;
  }
  #pagefilter {
    margin: 10px auto;

    .page-list {
      height: 30px;
      line-height: 30px;
      margin: 0 auto;
      width: 50%;
      display: flex;
      justify-content: space-around;

      & > :nth-child(1), & > :last-child {
        width: auto;
      }

      li {
        width: 40px;
        text-align: center;

        button {
          background-color: #eeeeee;
          border: none;
          border-radius: 5px;
          height: 100%;
          width: 100%;
          cursor:pointer;
          border: 1px solid #7a6e6e;
          &:hover{
            background-color: #4cb9fc;
            transition: background-color .5s;
          }
          /*&:active{*/
          /*  background-color: #bfa;*/
          /*}*/
        }
      }

    }
  }

</style>