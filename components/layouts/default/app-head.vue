<template>
  <div class="yocss-hd">
    <div class="container">
      <base-logo
        class="fl"
        style="padding: 5px; width: 60px; height: 60px;"
      />
      <!-- 导航 -->
      <nav
        class="fl"
        style="margin-left: 50px; font-size: 16px;"
      >
        <nuxt-link to="/">
          首页
        </nuxt-link>
        <nuxt-link to="/">
          新闻
        </nuxt-link>
      </nav>
      <!-- /导航 -->
      <base-login
        class="fr"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHead'
}
</script>
