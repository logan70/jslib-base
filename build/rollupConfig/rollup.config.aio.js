// umd格式
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const getCompiler = require('./getCompiler')
const { srcType, umdName, banner, footer, output } = require('../../jslib.config')

exports.inputOption = {
  input: `src/index.${srcType}`,
  plugins: [
    nodeResolve({
      main: true,
      extensions: ['.js']
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    getCompiler()
  ]
}

exports.outputOption = {
  file: output.umd,
  format: 'umd',
  name: umdName,
  banner,
  footer,
  // 源代码不会同时使用export和export default时，可设置为true，legacy模式下的模块系统可以兼容ie6-8
  // legacy: false,
}