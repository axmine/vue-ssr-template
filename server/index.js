const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const session = require('koa-session')
const koaBoay = require('koa-body')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // auth Start
  app.use(koaBoay({
    multipart: true
  }))
  app.keys = ['abc', 'cba', 'dba', 'eba']
  app.use(session({
    key: 'koa:sess',
    maxAge: 1800000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false
  }, app))
  // auth End

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)
  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // auth Start
  router.post('/auth', ctx => {
    ctx.status = 200
    ctx.session.token = ctx.request.body.token || ''
    ctx.body = { code: '2000', data: '', info: '' }
  })
  app.use(router.routes()).use(router.allowedMethods())
  // auth End

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
