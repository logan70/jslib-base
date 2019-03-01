<h1 align="center">@logan/jslib-base</h1>

<div align="center">

开箱即用的JavaScript库开发框架。
**基于颜海镜大佬的[yanhaijing/jslib-base](https://github.com/yanhaijing/jslib-base)**

</div>

## 特性

- 支持ES6+或TypeScript编写源码
- 第三方依赖自动注入（自动剔除第三方依赖无用代码tree shaking）
- 多环境支持（支持浏览器原生，支持AMD，CMD，支持Webpack，Rollup，fis等，支持Node）
- 集成文档自动生成(JSDoc | TypeDoc)
- 集成代码风格校验(eslint | tslint)
- 集成单元测试环境及测试覆盖率(默认关闭)（jest）
- 支持一键重命名
- 支持监听构建
- 集成commit信息校验及增量lint(husky)
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

然后就可以在`src/`文件夹愉快滴开发了，也可使用dev模式监听变化构建，实时查看效果，开发完成后打包

```bash
# 监听构建
$ npm run dev
# 打包构建
$ npm run build
```

## 文档

自动生成API文档样例见[API文档](https://logan70.github.io/jslib/)

## 支持环境

> 这里指打包后的文件支持环境，开发环境要求node8+

| IE   | CH   | FF   | SF   | OP   | IOS  | Android   | Node  |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ----- |
| 8+   | 29+ | 55+  | 9+   | 50+  |  9+   | 4+   | 4+ |

## 目录介绍

```
├── src                        // 源码目录
├── dist                       // 打包后文件目录
  ├──index.aio.js              // UMD格式文件，适用于浏览器直接引入、AMD、CMD
  ├──index.aio.min.js          // UMD格式压缩版文件，适用于浏览器直接引入、AMD、CMD
  ├──index.esm.js              // ES Modules格式文件，适用于Webpack、rollup等预编译工具
  └──index.js                  // Commonjs格式文件，适用于Node环境
├── docs                       // 自动生成API文档目录
├── __tests__                  // Jest测试文件目录
└──coverage                    // Jest覆盖信息文件目录
```

## License

[MIT](https://github.com/logan70/jslib-base/blob/master/LICENSE)