<template>
  <div class="yocss-bd">
    <div class="container">
      <a
        href="javascript:void(0);"
        @click="getData"
      >Test Request</a>
      <p>aabbcc</p>
      <p>aabbcc</p>
      <p>aabbcc</p>
      <p>aabbcc</p>
      <p>aabbcc</p>
      <p>aabbcc</p>
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
  },
  methods: {
    async getData() {
      const data = await this.$post('login', { user: 'admin', pass: 'admin' })
      if (data.code === process.env.successCode) {
        this.$message.success(data.info)
      } else {
        this.$message.error(data.info)
      }
    }
  }
}
</script>
