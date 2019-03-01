<h1 align="center">@logan/jslib</h1>

<div align="center">

开箱即用的JavaScript库开发框架。

</div>

## :star: 特性

- **支持ES6+编写源码**：支持使用 ES6+ 语法编写源码，babel自动编译
- **Tree Shaking**：使用[rollup](https://www.rollupjs.com/guide/zh)打包，自动剔除第三方依赖无用代码
- **多环境支持**：可生成 **UMD**、 **CommonJS**、 **ES Modules** 三种模块化格式文件，满足不同环境使用
- **集成代码风格校验**：ESLint校验代码风格，采用[Airbnb的ESLint规范](https://github.com/lin-123/javascript)，并**禁止分号**
- **自动生成API文档**：开发者按规范进行注释，通过JSDoc自动生成API文档，并自动部署至[Zero API 文档](http://zero.pages.oa.com)

## :rocket: 使用

使用tnpm安装zero

```bash
$ tnpm install @tencent/zero --save-dev
```

如果你是node环境

```js
const zero = require('@tencent/zero')
// 按模块引入
const { Msg, Util } = require('@tencent/zero')
```

如果你是vue等环境

```js
import zero from '@tencent/zero'
// 按模块引入
import { Msg, Util } from '@tencent/zero'
```

如果你是浏览器环境

```html
<script src="node_modules/@tencent/zero/dist/index.aio.min.js"></script>
```

如果你是requirejs环境

```js
requirejs(['node_modules/@tencent/zero/dist/index.aio.min.js'], function(zero) {
    // xxx
})
```

## :bookmark_tabs: 文档

更多使用信息请参考[API文档](http://zero.pages.oa.com)

## :pill: 支持环境

| IE   | CH   | FF   | SF   | OP   | IOS  | Android   | Node  |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ----- |
| 8+   | 29+ | 55+  | 9+   | 50+  |  9+   | 4+   | 4+ |

## :open_file_folder: 目录介绍

```
- src                        // zero 源码目录

- build                      // 打包构建配置文件目录
- dist                       // 打包后文件目录
  - index.aio.js             // UMD格式文件，适用于浏览器直接引入、AMD、CMD
  - index.aio.min.js         // UMD格式压缩版文件，适用于浏览器直接引入、AMD、CMD
  - index.esm.js             // ES Modules格式文件，适用于Vue等脚手架，Webpack、rollup等预编译工具
  - index.js                 // Commonjs格式文件，适用于Node环境
- docs                       // JSDoc自动生成API文档目录
```

## :kissing_heart: 贡献者指南