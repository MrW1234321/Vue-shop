<template>
  <div>
    <!-- 模态框 -->
    <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':mdShow}">
      <div class="md-modal-inner">
        <div class="md-top">
          <slot name="closeBtn"></slot>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
              <slot name="message"></slot>
          </div>
          <div class="btn-wrap">
              <slot name="btnGroup"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="mdShow"></div>
  </div>
</template>

<script>
  export default {
    props: ['mdShow'],
    name: 'modal',
    data () {
      return {
      }
    },
    methods: {
      closeModal () {
      }
    }
  }
</script>