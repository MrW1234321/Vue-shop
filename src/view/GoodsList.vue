<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>商品</nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>价格:</dt>
              <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" :class="{'cur':priceChecked == 'all'}">All</a></dd>
              <dd v-for="(price,index) in priceFilter">
                <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur':priceChecked == index}">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>
          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in GoodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/img/' + item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">￥{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="load-more" @click="getMoreGoods" ref="loadMore">{{ loadingText  }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import NavHeader from '@/components/Header'
  import NavFooter from '@/components/Footer'
  import NavBread from '@/components/NavBread'
  import axios from 'axios'
  export default {
    name: 'GoodsList',
    data () {
      return {
        flag: 0,
        GoodsList: Array,
        page: 0,
        pagesize: 8,
        pageLock: 1,
        loadingText: '点击加载更多',
        sortFlag: 1,
        priceChecked: 'all',
        priceFilter: [
          {
            startPrice: '0',
            endPrice: '100'
          },
          {
            startPrice: '100',
            endPrice: '500'
          },
          {
            startPrice: '500',
            endPrice: '1000'
          },
          {
            startPrice: '1000',
            endPrice: '5000'
          }
        ]
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread
    },
    mounted: function () {
      this.getGoodsList()
    },
    methods: {
      getGoodsList () {
        let param = {
          sort: this.sortFlag ? 1 : -1,
          priceLevel: this.priceChecked,
          page: this.page,
          pagesize: this.pagesize
        }
        // 直接请求API会有跨域问题
        axios.get('/goods/list', {params: param}).then((result) => {
          let data = result.data.result
          if (!this.flag) {
            this.GoodsList = data
            this.flag = 1
            if (data.length < this.pagesize) { // 当请求的数量小于数据内容的时候，按钮关闭
              this.loadingText = '没有更多了~'
              this.pageLock = 0
            } else {
              this.pageLock = 1
              this.loadingText = '点击加载更多'
            }
          } else {
            if (data.length < this.pagesize) { // 当请求的数量小于数据内容的时候，按钮关闭
              this.loadingText = '没有更多了~'
              this.pageLock = 0
            }
            this.GoodsList = this.GoodsList.concat(data)
          }
        })
      },
      sortGoods () {
        this.flag = 0
        this.page = 0
        this.sortFlag = !this.sortFlag
        this.getGoodsList()
      },
      setPriceFilter (index) {
        this.flag = 0
        this.page = 0
        this.priceChecked = index
        this.getGoodsList()
      },
      getMoreGoods () {
        if (this.flag && this.pageLock) { // 控制按钮开关状态
          this.page++
          this.getGoodsList()
        } else {
          return
        }
      },
      addCart (productId) {
        axios.post('/goods/addCart', {
          productId: productId
        }).then((res) => {
          let data = res.data
          console.log(data)
          if (data.status === '0') {
            console.log('加入购物车成功')
          } else {
            console.log('加入购物车失败')
          }
        })
      }
    }
  }
</script>
