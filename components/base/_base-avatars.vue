<template>
  <div
    :style="avatarStyle"
    class="base-avatars"
  />
</template>
<script>
export default {
  name: 'BaseAvatars',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      avatarStyle: {
        backgroundSize: '100% 100%',
        backgroundImage: ''
      }
    }
  },
  watch: {
    src(val) {
      this.doRender(val)
    }
  },
  mounted() {
    this.doRender(this.src)
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
    doRender(url) {
      if (url) {
        const img = new Image()
        img.src = url
        this.avatarStyle.backgroundImage = `url(${url})`
        img.onload = () => {
          const val = parseInt(img.naturalHeight - img.naturalWidth)
          if (val === 0) {
            // 如果是正方形的图，则正常缩小即可
            this.avatarStyle.backgroundSize = '100% 100%'
          } else if (val < 0) {
            // 高比宽小
            this.avatarStyle.backgroundSize = 'auto 100%'
          } else {
            // 高比宽大
            this.avatarStyle.backgroundSize = '100% auto'
          }
        }
      } else {
        this.avatarStyle.backgroundImage = ''
      }
    }
  }
}
</script>
