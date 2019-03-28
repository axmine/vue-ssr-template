<template>
  <div class="yocss-bd">
    <div class="container">
      <p>aabbcc</p>
      <p>aabbcc</p>
      <p>aabbcc</p>
      <p>aabbcc</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  // asyncData 里不能使用 this
  // async asyncData({ app, store }) { },

  // fetch
  // async fetch({ store, params }) {
  //   let { data } = await axios.get('http://my-api/stars')
  //   store.commit('setStars', data)
  // },

  // layout: 'default',
  // // 或
  // layout(context) {
  //   return 'default'
  // }

  // head 里面可以使用 this
  head() {
    return {
      title: '首页',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '' },
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  data() {
    return { }
  }
}
</script>
