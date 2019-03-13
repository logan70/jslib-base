module.exports = {
  overrides: [
    {
      presets: ['@babel/preset-typescript'],
      test: /\.tsx?$/
    }
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
            debug: false
          }
        ],
      ]
    },
    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers:
                'last 2 versions, > 1%, ie >= 8, Android >= 4, iOS >= 6, and_uc > 9',
              node: '6'
            },
            // 是否将ES6模块转为CommonJS模块，必须为false
            // 否则 Babel 会在 Rollup 有机会做处理之前，将我们的模块转成 CommonJS，导致 Rollup 的一些处理失败
            // 例如rollup-plugin-commonjs插件，将 CommonJS 转换成 ES6 模块
            modules: false,
            // 按需进行polyfill
            useBuiltIns: 'usage'
          }
        ]
      ],
      plugins: [
        ['@babel/plugin-transform-runtime', { useESModules: true }]
      ]
    },
    development: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers:
                'last 2 versions, > 1%, ie >= 8, Android >= 4, iOS >= 6, and_uc > 9',
              node: '6'
            },
            // 是否将ES6模块转为CommonJS模块，必须为false
            // 否则 Babel 会在 Rollup 有机会做处理之前，将我们的模块转成 CommonJS，导致 Rollup 的一些处理失败
            // 例如rollup-plugin-commonjs插件，将 CommonJS 转换成 ES6 模块
            modules: false,
            // 按需进行polyfill
            useBuiltIns: 'usage'
          }
        ]
      ],
      plugins: [
        ['@babel/plugin-transform-runtime', { useESModules: true }]
      ]
    }
  },
  exclude: 'node_modules/**'
}
