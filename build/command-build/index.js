const path = require('path')
const rollup = require('rollup')
const { execSync } = require('child_process')
const { info, done, log, clearConsole} = require('../util/logger.js')

const Spinner = require('../util/spinner')
const runLint = require('../command-lint')
const { srcType, requireDocs, disableLint, blockBuildOnLintFailures, output } = require('../../jslib.config')
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

// get the list of rollup config files
const getConfigFiles = (types) => types.map(type => rollupConfigMap[type]).filter(Boolean)

// the list of bundle's relative path used to output file status
const outputFiles = []

// single rollup task
const runRollup = (configFile) => {
  return new Promise(async (resolve, reject) => {
    // require rollup config
    const options = require(path.resolve(__dirname, '../rollupConfig', configFile))
    // create bundle
    const bundle = await rollup.rollup(options.inputOption)
    try {
      await bundle.write(options.outputOption)
      outputFiles.push(options.outputOption.file)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

// check typescript, because .ts files will be transformed by babel instead of tsc
const checkTypeScript = () => {
  return new Promise(resolve => {
    try {
      execSync('tsc', { stdio: 'inherit' })
      resolve()
    } catch (error) {
      process.exit(0)
    }
  })
}


module.exports = async (args = {}) => {
  const startTime = new Date().getTime()
  const allTypes = Object.keys(rollupConfigMap)
  const moduleTypes = args._.filter(type => allTypes.includes(type))

  // delete module types from args._
  args._ = args._.filter(type => !allTypes.includes(type))

  // get the list of rollup config file
  const configFiles = moduleTypes && moduleTypes.length
    ? getConfigFiles(moduleTypes)
    : (output && Object.keys(output).length
      ? getConfigFiles(Object.keys(output))
      : Object.values(rollupConfigMap)
    )
    
  info('Building...')
  log()

  try {
    const spinner = new Spinner()
    spinner.log()
    log()
  
    // check typescript, because .ts files will be transformed by babel instead of tsc
    if (srcType === 'ts') {
      spinner.setMessage('Checking typeScript')
      await checkTypeScript()
    }

    // code linting
    let noLintErrors = false
    if (!disableLint) {
      spinner.setMessage('Linting code')
      if (blockBuildOnLintFailures) {
        args.failBuild = true
      }
      noLintErrors = await runLint(args)
    }

    // run rollup
    spinner.setMessage('Generating output files')
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
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}