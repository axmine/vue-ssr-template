// const pkg = require('./package')
const config = require('./app-config/config')
const env = process.env.NODE_ENV

module.exports = {
  mode: 'universal',
  env: {
    baseUrl: config.api[env],
    transformRequest: config.transformRequest,
    successCode: config.successCode,
    errorCode: config.errorCode
  },
  server: config.server,

  /*
  ** Headers of the page
  */
  head: {
    title: config.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: config.keywords },
      { hid: 'description', name: 'description', content: config.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: config.icon },
      ...config.cdnCSS
    ],
    script: config.cdnJS
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.css',
    '@/assets/css/index.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/axios',
    '@plugins/base-components'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa'
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor: ['axios', 'lodash'],
    extractCSS: { allChunks: true },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: {
      plugins: {
        'postcss-url': false,
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        autoprefixer: {}
      }
    }
  }
}
