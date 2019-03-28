<template>
  <div class="base-login">
    <a
      href="javascript:void(0);"
      @click="doLogin"
    >登录组件</a>
  </div>
</template>

<script>
export default {
  name: 'BaseLogin',
  methods: {
    doLogin() {
      // 鉴权 token 提交至服务器
      this.$store.dispatch('SetToken', '')
    }
  }
}
</script>
