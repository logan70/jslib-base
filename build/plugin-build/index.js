const path = require('path')
const rollup = require('rollup')
const { info, done, log, clearConsole} = require('../util/logger.js')

const runLint = require('../plugin-lint')
const getRollupConfig = require('../util/getRollupConfig')
const { requireDocs, disableLint, blockBuildOnLintFailures } = require('../../jslib.config')
const generateDocs = require('../plugin-doc')

// 不同环境配置文件映射
const rollupConfigMap = {
  // UMD模块化方案，适用于浏览器
  aio: 'rollup.config.aio.js',
  // UMD模块化方案，适用于浏览器
  aioMin: 'rollup.config.aio.min.js',
  // ES6模块化方案，适用于框架、预编译工具
  esm: 'rollup.config.esm.js',
  // CommonJS模块化方案，适用于Node环境
  cjs: 'rollup.config.js'
}

function runRollup(configFile) {
  return new Promise(async (resolve, reject) => {
    const options = getRollupConfig(configFile)

    const bundle = await rollup.rollup(options.inputOption)
    await bundle.write(options.outputOption)

    done(`${options.outputOption.file} generated successfully.`)
    log()
    resolve()
  })
}

module.exports = async (args = {}) => {
  const singleModule = args._[0]
  singleModule && args._.shift()
  clearConsole()
  // code linting
  if (!disableLint) {
    if (blockBuildOnLintFailures) {
      args.failBuild = true
    }
    await runLint(args)
  }

  // rollup config fileName of different module specification
  const configFiles = singleModule ? [rollupConfigMap[singleModule]] : Object.values(rollupConfigMap)

  try {
    log()
    info('Building...')
    log()
    // run rollup
    await Promise.all(configFiles.map(file => runRollup(file)))
  
    // generate documents
    if (requireDocs) {
      await generateDocs()
    }
  } catch (e) {
    throw new Error(e)
  }
}