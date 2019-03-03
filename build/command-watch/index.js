const path = require('path')
const rollup = require('rollup')
const { eslint } = require('rollup-plugin-eslint')
const tslint = require('rollup-plugin-tslint')

const { info, done, log, clearConsole} = require('../util/logger.js')
const { srcType, disableLint, requireDocs } = require('../../jslib.config')
const getRollupConfig = require('../util/getRollupConfig')
const generateDocs = require('../command-doc')
const inquirer = require('inquirer')

const promptArr = [{
  type: 'list',
  name: 'configFile',
  message: 'Select an output type to watch and rebuild on change:',
  default: 'rollup.config.aio.js',
  choices: [{
    value: 'rollup.config.aio.js',
    name: 'UMD - dist/index.aio.js (Used in browsers, AMD, CMD.)'
  }, {
    value: 'rollup.config.esm.js',
    name: 'ES6 - dist/index.esm.js (Used in ES6 Modules)'
  }, {
    value: 'rollup.config.js',
    name: 'CommonJS - dist/index.js (Used in Node)'
  }]
}]

// rollup watch mode options
const watchOption = {
  // chokidar should be used instead of the built-in fs.watch
  chokidar: true,
  include: 'src/**',
  clearScreen: false
}

module.exports = (args = {}) => {
  return new Promise((resolve, reject) => {
    // get the moudleType selected by user
    inquirer.prompt(promptArr).then(({ configFile }) => {
      const customOptions = getRollupConfig(configFile)
      const options = {
        ...customOptions.inputOption,
        output: customOptions.outputOption,
        watch: watchOption
      }
      if (!disableLint) {
        // add lint plugin to rollup options
        const lintPlugin = srcType === 'js'
          ? eslint({ include: 'src/**/*.js', formatter: 'codeFrame' })
          : tslint({ include: 'src/**/*.ts', formatter: 'codeFrame' })
        options.plugins.unshift(lintPlugin)
      }

      // start to watch
      const watcher = rollup.watch(options)

      // handle event
      let stamp
      watcher.on('event', async (event) => {
        if (event.code === 'START') {
          clearConsole()
          stamp = new Date().getTime()
          info('Building...')
          log()
        } else if (event.code === 'END') {
          // done(`${customOptions.outputOption.file} generated successfully.`)
          // generate documents
          if (requireDocs) {
            await generateDocs()
          }
          log()
          done(`Compiled successfully in ${new Date().getTime() - stamp}ms`)
          log()
        }
      })
    })
  })
}