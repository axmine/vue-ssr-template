import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context('../components/base/', false, /_base-[\w-]+\.vue$/)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\/_/, '').replace(/\.\w+$/, '')))
  // 全局注册组件
  Vue.component(componentName, componentConfig.default || componentConfig)
})
