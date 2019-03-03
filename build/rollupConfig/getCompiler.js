const babel = require('rollup-plugin-babel')
const typeScript = require('rollup-plugin-typescript2')
const { srcType } = require('../../jslib.config')

const jsCompiler = babel({
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
        // 按需进行polyfill
        useBuiltIns: 'usage'
      }
    ]
  ],
  plugins: ['@babel/plugin-transform-runtime'],
  runtimeHelpers: true,
  exclude: 'node_modules/**'
})

const tsCompiler = typeScript({
  // 覆盖tsconfig.json的配置，rollup仅支持ES6模块
  tsconfigOverride: {
    compilerOptions : { module: 'ES6', target: 'ES5' }
  }
})

module.exports = () => srcType === 'js' ? jsCompiler : tsCompiler