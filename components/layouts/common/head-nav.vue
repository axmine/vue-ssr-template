<template>
  <nav class="head-nav">
    <a href="#">首页</a>
    <nuxt-link to="/">
      新闻
    </nuxt-link>
  </nav>
</template>

<script>
export default {
  name: 'HeadNav'
}
</script>

<style lang="scss" scoped>
  .head-nav {
    a {
      padding: 10px 30px;
      font-size: 15px;
      margin-left: 15px;
      color: #333;
      border-radius: 30px;
      background-color: #f3f3f3;
      &:hover {
        color: #fff;
        background-color: #333;
      }
    }
  }
</style>
