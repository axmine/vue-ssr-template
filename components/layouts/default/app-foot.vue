<template>
  <div class="yocss-ft">
    <!-- <div class="container" /> -->
    <!-- 版权信息 -->
    <div class="container">
      <div class="website-right">
        <div class="yocss-ft__logo" />
        <p v-text="`Copyright © 2019 Yocss. All Rights Reserved.`" />
        <nav>
          <span>南昌市某某网络科技有限公司 版权所有</span> |
          <nuxt-link to="/">
            服务协议
          </nuxt-link> |
          <nuxt-link to="/">
            站点地图
          </nuxt-link> |
          <nuxt-link to="/">
            侵权投诉
          </nuxt-link> |
          <nuxt-link to="/">
            问题反馈
          </nuxt-link> |
          <nuxt-link to="/">
            帮助
          </nuxt-link>
        </nav>
      </div>
    </div>
    <!-- /版权信息 -->
  </div>
</template>

<script>
export default {
  name: 'AppFoot'
}
</script>
