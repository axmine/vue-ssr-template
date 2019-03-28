<template>
  <div class="base-logo">
    <nuxt-link
      to="/"
      :title="title"
    >
      <img
        :src="logo"
        :alt="title"
      >
    </nuxt-link>
  </div>
</template>

<script>
import logo from '@/assets/img/icon.png'
export default {
  name: 'BaseLogo',
  data() {
    return {
      logo,
      title: '南昌某某网络科技有限公司'
    }
  }
}
</script>

<style lang="scss" scoped>
  .base-logo {
    a {
      display: block;
      width: 100%;
      height: 100%;
      img {
        display: block;
        width: 100%;
        height: auto;
      }
    }
  }
</style>
