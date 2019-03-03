// rollup.config.js
// 模块化方案：CommonJS
const nodeResolve = require('rollup-plugin-node-resolve')
const getCompiler = require('./getCompiler')
const { srcType, banner, footer, output } = require('../../jslib.config')

exports.inputOption = {
  input: `src/index.${srcType}`,
  plugins: [
    nodeResolve({
      extensions: ['.js']
    }),
    getCompiler()
  ]
}

exports.outputOption = {
  file: output.cjs,
  format: 'cjs',
  banner,
  footer,
  // 源代码不会同时使用export和export default时，可设置为true，legacy模式下的模块系统可以兼容ie6-8
  // legacy: true,
}
