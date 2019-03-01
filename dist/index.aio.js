/*!
  * Generated by @logan/jslib. (https://github.com/logan70/jslib)
  * Copyright 2018-2019 logan70. All Rights Reserved
  * Licensed under MIT (https://github.com/logan70/jslib/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.loganUmdName = factory());
}(this, function () { 'use strict';

  /**
   * @module loganUmdName
   */
  /**
   * @description 测试函数
   */
  function test(info) {
      console.log('test: ', info);
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
   * import loganUmdName from '@logan/jslib'
   * loganUmdName.someMethod(someParams)
   *
   * // Node内使用
   * const loganUmdName = require('@logan/jslib')
   * loganUmdName.someMethod(someParams)
   * ```
   */
  var loganUmdName = {
      test: test,
  };

  return loganUmdName;

}));
/* Generated by @logan/jslib. https://github.com/logan70/jslib */
