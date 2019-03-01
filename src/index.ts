/**
 * @module loganUmdName
 */

/**
 * @description 测试函数
 * @example
 * ```js
 * 
 * loganUmdName.test('Hello World!')
 * ```
 */
function test(info: string): string {
  console.log('test: ', info)
  return info
}

/**
 * @description JavaScript库 - loganUmdName
 * @see https://github.com/logan70/jslib
 * @example
 * ```js
 *
 * // 浏览器内使用
 * // 引入文件：<script src="path/to/index.aio.min.js"><script>
 * window.loganUmdName.someMethod(someParams)
 *
 * // es6模块规范内使用
 * import loganUmdName from '@logan/jslib-base'
 * loganUmdName.someMethod(someParams)
 *
 * // Node内使用
 * const loganUmdName = require('@logan/jslib-base')
 * loganUmdName.someMethod(someParams)
 * ```
 */
const loganUmdName = {
  test,
}

export default loganUmdName
