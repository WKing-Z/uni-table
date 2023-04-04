<!--可用-->
<template>
  <view class="t-table-page" @scroll.stop="onScroll">
    <scroll-view
        :scroll-x="true"
        :scroll-y="true"
        @scroll="e => onScroll(e, 'leftTableBody')"
        @scrolltolower="onScrollToLower"
        ref="tableBody"
        :show-scrollbar="false"
        style="height: 100%">

      <view class="t-table-box">
        <view class="t-table-header t-table-box_header">
          <view v-for="(headerItem, index) in column"
                :key="`headerItem_${index}`"
                class="header_content">
            <view
                :style="{
              width: (headerItem.width ? headerItem.width : tableWidth) + 'rpx',
              height: headerHeight + 'rpx', 'line-height':
              headerHeight +'rpx',
              background: headerBackground}"
                :class=" {
              'header_item': true,
               'header_item-scroll': headerScroll
            }">
              {{ headerItem.value }}
            </view>
          </view>
        </view>
        <view v-if="listData && listData.length !== 0" class="t-table-box_content"
              :style="{top: Number(headerHeight + 2) + 'rpx' }">
          <view v-for="(item, index) in listData"
                :style="{height: boxHeight + 'rpx', 'line-height': boxHeight + 'rpx'}"
                :key="`item_${index}`" class="box_content">
            <view class="box_content-item"
                  v-for="(headerItem) in column"
                  :style="{
                    width: (headerItem.width ? headerItem.width : tableWidth) + 'rpx'
                  }"
                  :key="headerItem.key">
              {{ item[headerItem.key] }}
            </view>
          </view>
        </view>
        <view :style="{width: leftBoxWidth + 'rpx'}" class="t-table-box_left"
              :class="{'t-table-box_left_shadow': isLeftShadow}">
          <view class="t-table-header t-table-box_left_header">
            <view v-for="(item, index) in leftColumn" :key="index" class="header_content">
              <view
                  :style="{width: (item.width ? item.width :  tableWidth) + 'rpx', height: headerHeight + 'rpx', 'line-height': headerHeight +'rpx',  background: headerBackground}"
                  class="header_item">
                {{ item.value }}
              </view>
            </view>
          </view>
          <view v-if="listData && listData.length !== 0" class="t-table-box_left_box">
            <view v-for="(item, index) in listData" :key="index"
                  :style="{height: boxHeight + 'rpx', 'line-height': boxHeight + 'rpx'}"
                  class="box_content">
              <view class="box_content-item"
                    v-for="(line) in leftColumn" :style="{width : (line.width ? line.width: tableWidth) + 'rpx'}"
                    :key="line.key">{{
                  item[line.key]
                }}
              </view>
            </view>
          </view>
        </view>
      </view>

      <template v-if="isPage">
        <view v-if="listData && listData.length !== 0">
          <uni-load-more v-if="isLoadMore" :status="loadingType"></uni-load-more>
        </view>
      </template>
      <template v-else>
        <view v-if="listData && listData.length !== 0">
          <uni-load-more status="noMore"></uni-load-more>
        </view>
      </template>
    </scroll-view>


    <template v-if="!(listData && listData.length !== 0)">
      <view class="t-table-page_empty" :style="{top: headerHeight + 'rpx'}">
        <view>
          <image mode="widthFix" :src="imgSrc"></image>
        </view>
        <view>暂无数据</view>
        <view></view>
      </view>
    </template>

  </view>

</template>
<script>
import props from "./props";
import uniLoadMore from "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue";

export default {
  name: 'zTableView',
  mixins: [
    props
  ],
  components: {
    uniLoadMore
  },
  computed: {
    isLeftShadow() {
      return this.scrollLeft > 0;
    },
    leftColumn() {
      return this.column.filter(item => item.fixed) || []
    },
    leftBoxWidth() {
      const list = this.column.filter(item => item.fixed)
      let leftWidth = 0
      if (list.length) {
        list.forEach(item => {
          const addWidth = item.width || this.tableWidth
          leftWidth += (addWidth)
        })
      }
      return leftWidth
    }
  },
  data() {
    return {
      column: [
        {
          key: 'name',
          value: '姓名',
          width: 200,
          fixed: true
        },
        {
          key: 'age',
          value: '年龄',
          width: 200,
          fixed: true
        },
        {
          key: 'one',
          value: '语文',
          width: 120
        },
        {
          key: 'two',
          value: '数学',
          width: 120
        },
        {
          key: 'three',
          value: '英语',
          width: 120
        },
        {
          key: 'four',
          value: '物理',
          width: 120
        },
        {
          key: 'five',
          value: '化学',
          width: 120

        },
        {
          key: 'six',
          value: '生物',
          width: 120
        },
      ],
      list: [],
      event: null,
      scrollLeft: 0,
      tableWidth: 160,

      loadMore: false
    }
  },

  created() {

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
    for (let i = 0; i < 50; i++) {
      item.age = i + 1
      newList.push(item)
    }

    this.list = newList
  },
  mounted() {


  },
  methods: {
    onScroll(e) {
      const detail = e.detail
      this.scrollLeft = detail.scrollLeft
    },
    onScrollToLower(e) {
      if (!this.isPage) return false
      if (e.detail.direction === 'bottom') {
        this.$emit('onScrollToLower')
      }
    }

  }
}
</script>

<style lang="scss">
@import "index";
</style>