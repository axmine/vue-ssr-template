<template>
  <no-ssr>
    <div
      v-quill:myQuillEditor="options"
      :content="content"
      class="quill-editor"
      @change="handleChange"
      @ready="handleReady"
    />
  </no-ssr>
</template>

<script>
import OSS from 'ali-oss'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Vue from 'vue'
if (process.browser) {
  const VueQuillEditor = require('vue-quill-editor/dist/ssr')
  Vue.use(VueQuillEditor)
}
export default {
  name: 'BaseEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    // 不要给太多工具， 工具太多会导致垃圾标签过多， 不利于seo, 不利于前端对样式进行控制，而且容易导致渲染性能低下
    options: {
      type: Object,
      default: () => {
        return {
          modules: {
            toolbar: [
              [{ 'header': [false, 1, 2, 3] }],
              ['bold', 'italic'],
              ['image'],
              ['clean']
            ]
          }
        }
      }
    }
  },
  data() {
    return {
      content: '',
      quill: null,
      filesInput: null
    }
  },
  beforeDestroy() {
    this.filesInput.removeEventListener('change', this.handleUpload)
  },
  methods: {
    // 编辑器初始化完成
    handleReady(quill) {
      this.quill = quill
      console.log(this.quill)
      const toolbar = this.quill.getModule('toolbar')
      toolbar.addHandler('image', this.handleImage)
    },
    // 内容改动
    handleChange(e) {
      this.$emit('input', e.html)
    },
    // 处理图片上传
    handleImage(bool) {
      if (bool) {
        this.filesInput = document.createElement('input')
        this.filesInput.type = 'file'
        this.filesInput.accept = '.jpg, .png, .jpeg, .gif'
        this.filesInput.click()
        this.filesInput.addEventListener('change', this.handleUpload, false)
      }
    },
    // 得到文件对象列表后, 开始处理上传
    handleUpload(event) {
      // 文件已得到，把这个文件对象传到阿里云上，万事OK
      const file = event.path[0].files[0]
      console.log(file)
      const range = this.quill.getSelection()

      // 假设这个是传成功之后的图片地址
      const value = 'http://www.baidu.com/a.jpg'
      // 播入内容区光标所在的点
      this.quill.insertEmbed(range !== null ? range.index : 0, 'image', value, 'api')
    },
    // 以下方法均为处理图片直传至 OSS
    // 获取STS授权
    async getSTS() {
      const result = []
      const data = await this.$post('upload/stsUpload', { number: 1 }, { baseURL: 'http://wk.sihongedu.com/api/' })
      if (data.code === '200') {
        // 实例化OSS时的参数
        const config = {
          accessKeyId: data.data.accessKeyId,
          accessKeySecret: data.data.accessKeySecret,
          region: data.data.endpoint,
          bucket: data.data.bucket,
          stsToken: data.data.securityToken
        }
        const file = {
          path: data.data.path,
          fileName: data.data.file_name[0]
        }
        result.push(config, file)
      } else {
        this.$message({
          type: 'error',
          message: '获取授权失败'
        })
      }
      return result
    },
    // 执行上传文件
    async doUpload(params, file) {
      const client = new OSS(params[0])
      const filename = `${params[1].path + params[1].fileName}.${this.getFileType(file.name)}`
      const _this = this
      const { bucket, name, res } = await client.multipartUpload(filename, file, {
        partSize: _this.setPartSize(file.size),
        progress: function(p, checkpoint) {
          _this.progress = p === 1 ? 100 : (p * 100).toFixed(2)
          _this.filePoint = checkpoint
        }
      })
      return { bucket, name, res }
    },
    // 设置分片大小, 根据文件大小确定分片的大小，进度条走数时会好看一些
    setPartSize(fileSize) {
      const size = this.formatUnit(fileSize).split(' ')
      let num = size[1] === 'GB' ? 819200 : 102400
      if (size[1] === 'MB') {
        if (size[0] <= 10) {
          num = 307200
        }
        num = size[0] <= 10 ? 307200 : 512000
      }
      return num
    },
    // 获取文件扩展名
    getFileType(name) {
      const post = name.lastIndexOf('.')
      return post < 0 ? '' : name.slice(post * 1 + 1).toLowerCase()
    }
  }
}
</script>
