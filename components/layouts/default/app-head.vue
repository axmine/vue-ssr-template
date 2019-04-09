<template>
  <div class="yocss-hd">
    <div class="container">
      <base-logo
        class="fl"
        style="padding: 15px; width: 70px; height: 70px;"
      />
      <!-- 导航 -->
      <head-nav class="fl" />
      <!-- /导航 -->
      <base-login
        class="fr"
      />
    </div>
  </div>
</template>

<script>
import HeadNav from '@/components/layouts/common/head-nav.vue'
export default {
  name: 'AppHead',
  components: {
    HeadNav
  }
}
</script>
