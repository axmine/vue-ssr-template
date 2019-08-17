<template>
  <div class="yocss-bd">
    <div class="container">
      <no-ssr>
        <base-editor
          v-model="content"
        />
      </no-ssr>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Test',
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
  data() {
    return {
      content: '<p>hahahah</p>'
    }
  },
  // head 里面可以使用 this
  head() {
    return {
      title: '测试页',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '' },
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  watch: {
    content(v) {
      console.log(v)
    }
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
