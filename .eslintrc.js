const { srcType } =  require('./jslib.config')

let lintConfig = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module'
  },
  plugins: [],
  rules: {
    // 生产环境不允许console
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 生产环境不允许debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止在语句末尾使用分号 (除了消除以 [、(、/、+ 或 - 开始的语句的歧义)
    'semi': ['error', 'never'],
    // 禁止函数圆括号之前有一个空格
    'space-before-function-paren': 0,
    // 操作符后面可以换行，问号及冒号
    'operator-linebreak': ['error', 'after', { 'overrides': { '?': 'before', ':': 'before' } }],
  },
  // 可以使用的全局变量名
  globals: {
  },
}

if (srcType === 'ts') {
  lintConfig.parser = '@typescript-eslint/parser'
  lintConfig.parserOptions.project = './tsconfig.json'
  lintConfig.plugins = [...lintConfig.plugins, '@typescript-eslint']
  lintConfig.extends.push('plugin:@typescript-eslint/recommended')
  lintConfig.rules = Object.assign(lintConfig.rules, {
    '@typescript-eslint/indent': ['off']
  })
}

module.exports = lintConfig