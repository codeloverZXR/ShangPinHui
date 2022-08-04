<template>
  <div id="pagefilter">
    <ul class="page-list">
      <li>共{{pageSize}}条数据</li>
      <li>
        <button>上一页</button>
      </li>
      <li v-for="item in continues" :key="item">
        <button>{{item}}</button>
      </li>
      <li>
        <button>下一页</button>
      </li>
      <li>共有{{total}}页</li>
    </ul>
  </div>
</template>

<script lang='ts'>
  import {computed, defineComponent} from 'vue'

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
        } else {
          start = props.pageNo - Math.floor(props.continues / 2)
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
      return {
        startAndend
      }
    },
  })
</script>

<style scoped lang="scss">
  #pagefilter {
    margin: 10px auto;

    .page-list {
      height: 30px;
      line-height: 30px;
      margin: 0 auto;
      width: 40%;
      display: flex;
      justify-content: space-around;

      & > :nth-child(1), & > :last-child {
        width: auto;
      }

      li {
        width: 40px;
        text-align: center;

        button {
          background-color: #4cb9fc;
          border: none;
          border-radius: 5px;
          height: 100%;
          width: 100%;
        }
      }

    }
  }

</style>