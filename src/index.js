/**
 * @module umdName
 * @description JavaScript库 - umdName
 * @see https://github.com/logan70/jslib-base
 * @example
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
 */
/**
 * @description 加法函数
 * @method add
 * @memberof module:umdName
 * @param {Number} num1 - 加数
 * @param {Number} num2 - 被加数
 * @return {Number} - 两数相加结果
 * @example
 * umdName.add('Hello World!')
 */
// eslint-disable-next-line
export const add = (num1, num2) => num1 + num2;
