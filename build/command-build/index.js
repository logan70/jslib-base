const path = require('path')
const rollup = require('rollup')
const { info, done, log, clearConsole} = require('../util/logger.js')

const runLint = require('../command-lint')
const { requireDocs, disableLint, blockBuildOnLintFailures } = require('../../jslib.config')
const generateDocs = require('../command-doc')

// configure file for different output type
const rollupConfigMap = {
  // UMD
  aio: 'rollup.config.aio.js',
  // UMD, uglified
  aioMin: 'rollup.config.aio.min.js',
  // ES6 Modules
  esm: 'rollup.config.esm.js',
  // CommonJS
  cjs: 'rollup.config.js'
}

function runRollup(configFile) {
  return new Promise(async (resolve) => {
    // require rollup config
    const options = require(path.resolve(__dirname, '../rollupConfig', configFile))
    // bundle
    const bundle = await rollup.rollup(options.inputOption)
    await bundle.write(options.outputOption)

    done(`${options.outputOption.file} generated successfully.`)
    log()
    resolve()
  })
}

module.exports = async (args = {}) => {
  const allTypes = Object.keys(rollupConfigMap)
  const moduleTypes = args._.filter(type => allTypes.includes(type))
  args._ = args._.filter(type => !allTypes.includes(type))
  clearConsole()
  // code linting
  if (!disableLint) {
    if (blockBuildOnLintFailures) {
      args.failBuild = true
    }
    await runLint(args)
  }

  // rollup config fileName of different module specification
  const configFiles = moduleTypes && moduleTypes.length
    ? moduleTypes.map(moduleKey => rollupConfigMap[moduleKey])
    : Object.values(rollupConfigMap)

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