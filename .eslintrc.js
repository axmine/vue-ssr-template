module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'no-console': 'off', // 允许使用console
    'space-before-function-paren': ['error', 'never'], // 函数与小括号之间不允许有空格
    'arrow-parens': ['error', 'as-needed'] // 箭头函数的括号不是必须的
    // 'prefer-promise-reject-errors': 'error'
  }
}
