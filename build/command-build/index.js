const path = require('path')
const rollup = require('rollup')
const { info, done, log, clearConsole} = require('../util/logger.js')

const Spinner = require('../util/spinner')
const runLint = require('../command-lint')
const { requireDocs, disableLint, blockBuildOnLintFailures } = require('../../jslib.config')
const generateDocs = require('../command-doc')
const logStats = require('../util/logStats')

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


module.exports = async (args = {}) => {
  const startTime = new Date().getTime()
  const allTypes = Object.keys(rollupConfigMap)
  const moduleTypes = args._.filter(type => allTypes.includes(type))

  // delete module types from args._
  args._ = args._.filter(type => !allTypes.includes(type))

  // rollup config fileName of different module specification
  const configFiles = moduleTypes && moduleTypes.length
    ? moduleTypes.map(moduleKey => rollupConfigMap[moduleKey])
    : Object.values(rollupConfigMap)

  // output file relative path used to log file status
  const outputFiles = []

  // single rollup task
  const runRollup = (configFile) => {
    return new Promise(async (resolve) => {
      // require rollup config
      const options = require(path.resolve(__dirname, '../rollupConfig', configFile))
      // bundle
      const bundle = await rollup.rollup(options.inputOption)
      await bundle.write(options.outputOption)
  
      outputFiles.push(options.outputOption.file)
      resolve()
    })
  }

  try {
    info('Building...')
    log()
    const spinner = new Spinner()
    spinner.log()
    log()

    let noLintErrors = false
    // code linting
    if (!disableLint) {
      spinner.setMessage('Linting code')
      if (blockBuildOnLintFailures) {
        args.failBuild = true
      }
      noLintErrors = await runLint(args)
    }
    log()
    spinner.setMessage('Generating output files')
    // run rollup
    await Promise.all(configFiles.map(file => runRollup(file)))
  
    // generate documents
    if (requireDocs) {
      spinner.setMessage('Generating documents')
      await generateDocs()
    }

    // success info
    spinner.clear()
    const endTime = new Date().getTime()
    noLintErrors && clearConsole()
    done(`Compiled successfully in ${endTime - startTime}ms`)
    log()

    // log file stats
    logStats(outputFiles)
  } catch (e) {
    console.error(e)
  }
}