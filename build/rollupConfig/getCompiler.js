/**
 * 获取编译配置
 */

const babel = require('rollup-plugin-babel')
const typeScript = require('rollup-plugin-typescript2')

const { srcType } = require('../../jslib.config')

const jsCompiler = babel({
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: 'last 2 versions, > 1%, ie >= 6, Android >= 4, iOS >= 6, and_uc > 9',
          node: '0.10'
        },
        // 是否将ES6模块转为CommonJS模块，必须为false
        // 否则 Babel 会在 Rollup 有机会做处理之前，将我们的模块转成 CommonJS，导致 Rollup 的一些处理失败
        // 例如rollup-plugin-commonjs插件，将 CommonJS 转换成 ES6 模块
        modules: false,
        loose: false,
        useBuiltIns: 'usage'
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: false,
        regenerator: false
      }
    ]
  ],
  runtimeHelpers: true,
  exclude: 'node_modules/**'
})

module.exports = function getCompiler(tsCompilerConfig = {
  tsconfigOverride: { compilerOptions : { module: 'ES6', target: 'ES5' } }
}) {
  if (srcType === 'js') {
    return jsCompiler
  } else if (srcType === 'ts') {
    return typeScript(tsCompilerConfig)
  }
} 