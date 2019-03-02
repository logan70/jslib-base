/**
 * @module umdName
 */

/**
 * @description 加法函数
 * @param num1 - 加数
 * @param num2 - 被加数
 * @example
 * ```js
 *
 * umdName.add(1, 2)
 * ```
 */
function add(num1: number, num2: number): number {
  return num1 + num2
}

/**
 * @description JavaScript库 - umdName
 * @see https://github.com/logan70/jslib-base
 * @example
 * ```js
 *
 * // 浏览器内使用
 * // 引入文件：<script src="path/to/index.aio.min.js"><script>
 * window.umdName.add(1, 2)
 *
 * // es6模块规范内使用
 * import umdName from '@logan/jslib-base'
 * umdName.add(1, 2)
 *
 * // Node内使用
 * const umdName = require('@logan/jslib-base')
 * umdName.add(1, 2)
 * ```
 */
const umdName = {
  add,
}

export default umdName
