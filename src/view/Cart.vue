<template>
  <div>
    <nav-bread>购物车</nav-bread>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import NavFooter from '@/components/Footer'
  import NavBread from '@/components/NavBread'
  export default {
    name: 'Cart',
    data () {
      return {
      }
    },
    components: {
      NavFooter,
      NavBread
    }
  }
</script>