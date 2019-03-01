/**
 * @description 测试函数
 * @method test
 * @memberof loganUmdName
 * @param {String} info - 要打印的信息
 * @return {String} - 输入的字符串
 * @example
 * loganUmdName.test('Hello World!')
 */
function test(info) {
  // eslint-disable-next-line
  console.log('test: ', info)
  return info
}

/**
 * @description JavaScript库 - loganUmdName
 * @namespace loganUmdName
 * @see https://github.com/logan70/jslib
 * @example
 * // 浏览器内使用
 * // 引入文件：<script src="path/to/index.aio.min.js"><script>
 * window.loganUmdName.someMethod(someParams)
 *
 * // es6模块规范内使用
 * import loganUmdName from '@logan/jslib'
 * loganUmdName.someMethod(someParams)
 *
 * // Node内使用
 * const loganUmdName = require('@logan/jslib')
 * loganUmdName.someMethod(someParams)
 */
const loganUmdName = {
  test,
}

export default loganUmdName