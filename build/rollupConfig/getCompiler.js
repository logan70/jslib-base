const babel = require('rollup-plugin-babel')

const { srcType } = require('../../jslib.config')

module.exports = () => babel({
  runtimeHelpers: true,
  extensions: ['.js', '.ts', '.jsx', '.tsx']
})