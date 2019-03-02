<h1 align="center">jslib-base</h1>

<div align="center">

开箱即用的JavaScript库开发框架。
<br>
**基于颜海镜大佬的[yanhaijing/jslib-base](https://github.com/yanhaijing/jslib-base)**
<br>

</div>

本项目助力开发者轻松开发属于自己的JavaScript库。

## 特性

- 支持ES6+或TypeScript编写源码
- 第三方依赖自动注入（自动剔除第三方依赖无用代码tree shaking）
- 多环境支持（支持浏览器原生，支持AMD，CMD，支持Webpack，Rollup，fis等，支持Node）
- 集成文档自动生成(JSDoc|TypeDoc)
- 集成代码风格校验(eslint|tslint)
- 集成单元测试环境(jest)
- 集成测试覆盖率(默认关闭)
- 支持一键重命名
- 支持监听构建
- 集成commit信息校验及增量lint(husky)
- 集成commit信息模板(使用`npm run commit`代替`git commit`)
- 集成可持续构建工具[travis-ci](https://www.travis-ci.org/)
- 集成ISSUE_TEMPLATE

## 使用

克隆项目至本地并安装依赖

```bash
$ git clone https://github.com/logan70/jslib-base.git
$ cd jslib-base
$ npm install
```

初始化框架，按照提示填写项目名、变量名及项目地址

```bash
$ npm run init
```

根据个人情况修改配置文件`jslib.config.js`

然后就可以在`src/`文件夹愉快地开发了(可监听变化构建，实时查看效果)，开发完成后打包

```bash
# 监听构建
$ npm run dev
# 打包构建
$ npm run build
```

## 文档

[API文档样例（JavaScript版）](https://logan70.github.io/jslib-base/docs/jsdoc/index.html)

[API文档样例（TypeScript版）](https://logan70.github.io/jslib-base/docs/tsdoc/index.html)

[单元测试覆盖信息样例](https://logan70.github.io/jslib-base/coverage/lcov-report/index.html)

## 支持环境

> 开发环境要求Node8+

| IE   | CH   | FF   | SF   | OP   | IOS  | Android   | Node  |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ----- |
| 8+   | 29+ | 55+  | 9+   | 50+  |  9+   | 4+   | 4+ |

## 目录介绍

```
├── src                        // 源码目录
├── dist                       // 打包产出代码目录
├── docs                       // API文档目录
├── __tests__                  // 单元测试文件目录
├── coverage                   // 单元测试覆盖信息目录
├── jslib.config.js            // 框架配置文件
└── CHANGELOG.md               // 变更日志
```

## License

[MIT](https://github.com/logan70/jslib-base/blob/master/LICENSE)