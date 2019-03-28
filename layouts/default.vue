<template>
  <div class="yocss-app">
    <app-head />
    <nuxt />
    <app-foot />
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
  components: {
    AppHead: () => import('@/components/layouts/default/app-head.vue'),
    AppFoot: () => import('@/components/layouts/default/app-foot.vue')
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
