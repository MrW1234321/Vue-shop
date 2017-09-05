<template>
  <div>
    <nav-bread>购物车</nav-bread>
    <div class="container">
      <div class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>我的购物车</span></h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>商品</li>
                <li>价格</li>
                <li>数量</li>
                <li>总价</li>
                <li>删除</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="item in cartList">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a href="javascipt:;" class="checkbox-btn item-check-btn">
                      <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                      </svg>
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <img :src="'/static/img/' + item.productImage">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{ item.productName }}</div>
                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{ item.salePrice }}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self select-self-open">
                      <div>
                        <span class="select-self-area" @click="editNum(item.productId, item.productNum, 'sub')">-</span>
                        <span class="select-ipt">{{ item.productNum }}</span>
                        <span class="select-self-area" @click="editNum(item.productId, item.productNum, 'add')">+</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{ item.salePrice * item.productNum }}</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn">
                      <svg class="icon icon-del">
                        <use xlink:href="#icon-del"></use>
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart-foot-wrap">
          <div class="cart-foot-inner">
            <div class="cart-foot-l">
              <div class="item-all-check">
                <a href="javascipt:;">
                      <span class="checkbox-btn item-check-btn">
                          <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                      </span>
                  <span>全选</span>
                </a>
              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                总价: <span class="total-price">{{ totalPrice }}</span>
              </div>
              <div class="btn-wrap">
                <a class="btn btn--red">确认付款</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBread from '@/components/NavBread'
  import axios from 'axios'
  export default {
    name: 'Cart',
    data () {
      return {
        cartList: {}
      }
    },
    components: {
      NavBread
    },
    mounted: function () {
      this.getCartList()
    },
    methods: {
      getCartList () {
        axios.post('/users/cartList').then((result) => {
          this.cartList = result.data.result
        })
      },
      editNum (productId, productNum, edit) {
        let productNumTemp = productNum
        if (edit === 'add') {
          productNumTemp++
        } else if (edit === 'sub') {
          productNumTemp--
        }
        console.log(productId, '' + productNumTemp, edit)
        // axios.post('/users/cartList/editNum', {productId: productId, edit: edit}).then((result) => {
        //   console.log(result)
        // })
      }
    }
  }
</script>