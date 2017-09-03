import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/view/GoodsList'
import Cart from '@/view/Cart'

Vue.use(Router)

export default new Router({
  // mode 有两种
  // hash 域名带#
  // history 不带#
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
