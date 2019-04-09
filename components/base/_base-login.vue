<template>
  <div class="base-login">
    <!-- <a
    >登录组件</a> -->
    <div class="base-login__info">
      <span
        class="fl"
        @click="doLogin"
      >登录/注册</span>
      <base-avatars
        src="https://sihong-wk.oss-cn-shanghai.aliyuncs.com/jkzx/assets/img/avatar_default.png"
        style="margin-left: 15px;width: 40px; height: 40px;"
        class="fr"
      />
    </div>
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

<style lang="scss" scoped>
  .base-login {
    height: 70px;
    padding: 15px 0;
    .base-login__info {
      height: 100%;
      span {
        font-size: 15px;
        line-height: 40px;
        cursor: pointer;
        &:hover {
          color: #42a8da;
        }
      }
    }
  }
</style>
