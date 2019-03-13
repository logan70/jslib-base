const path = require('path')
const rollup = require('rollup')
const { eslint } = require('rollup-plugin-eslint')
const logStats = require('../util/logStats')
const Spinner = require('../util/spinner')

const { info, done, log, clearConsole} = require('../util/logger.js')
const { srcType, disableLint } = require('../../jslib.config')
const getRollupConfig = require('../util/getRollupConfig')
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
const watchOptions = {
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
        watch: watchOptions
      }
      if (!disableLint) {
        // add lint plugin to rollup options
        const lintPlugin = eslint({ include: [`src/**/*.${srcType}`, `src/**/*.${srcType}x`], formatter: 'codeFrame' })
        options.plugins.unshift(lintPlugin)
      }

      // start to watch
      const watcher = rollup.watch(options)

      // handle event
      let stamp
      const files = [customOptions.outputOption.file]
      const spinner = new Spinner()
      watcher.on('event', (event) => {
        if (event.code === 'START') {
          clearConsole()
          stamp = new Date().getTime()
          spinner.setMessage(stamp ? 'Rebuilding...' : 'Building')
          spinner.log()
        } else if (event.code === 'END') {
          spinner.clear()
          done(`Compiled successfully in ${new Date().getTime() - stamp}ms`)
          log()
          log('  Waiting for changes...')
        }
      })
    })
  })
}