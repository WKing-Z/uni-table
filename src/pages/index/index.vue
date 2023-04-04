<template>
  <view>
    <scroll-table
        :is-page="true"
        :is-load-more="isLoadMore"
        :loading-type="loadMoreStatus"
        @onScrollToLower="onScrollToLower"
        :list-data="list"
    ></scroll-table>
  </view>
</template>
<script>
import scrollTable from "../../components/scroll-table/scroll-table.vue";

export default {
  name: 'testView',
  data() {
    return {

      isLoadMore: false,
      loadMoreStatus: 'loading',
      list: [],
      pageIndex: 1,
      totalPage: 4,
    }
  },
  components: {scrollTable},
  methods: {
    onSearch(index = 1) {
      const item = {
        name: '就会',
        age: '1',
        one: '453',
        two: '2',
        three: '345',
        four: '234',
        five: '34',
        six: '355',
      }

      let newList = []
      for (let i = 0; i < 40; i++) {
        item.age = i + 1
        newList.push(item)
      }

      this.pageIndex = index
      return newList
    },
    onScrollToLower() {
      const {totalPage, pageIndex} = this
      const _this = this

      if (this.isLoadMore) return false

      this.isLoadMore = true

      if (pageIndex >= totalPage) {
        this.loadMoreStatus = 'onMore'
        return false
      }

      const nextPageIndex = pageIndex + 1

      setTimeout(function () {
        const newList = _this.onSearch(nextPageIndex)
        _this.list = _this.list.concat(newList)
        _this.isLoadMore = false
      }, 2000)
    },
  },
  created() {
    this.list = this.onSearch(1)
  }


}
</script>