const fs = require('fs')
const path = require('path')
const { Linter, Configuration } = require('tslint')
const { info, done, error, log, clearConsole, chalk } = require('../util/logger.js')
const globFiles = require('../util/globFiles')

module.exports = async function tslint(args = {}) {
  info(`Linting code...`)
  log()

  const config = Object.assign({
    formatter: 'codeFrame',
    fix: false,
      // fail build if any lint errors found
    failBuild: false,
    ignore: '**/*.js',
    tslintConfigPath: 'tslint.json'
  }, args)

  const defaultFilesToLint = ['src/**/*.ts']

  let files = args._ && args._.length
    ? args._
    : defaultFilesToLint

  // get path of files that matched glob pattern
  files = globFiles(files)

  const linter = new Linter(config)
  const configFile = config.tslintConfigPath ? Configuration.findConfiguration(config.tslintConfigPath).results : undefined

  await Promise.all(files.map((file) => {
    return new Promise((resolve, reject) => {
      const filePath = path.resolve(__dirname, '../../', file)
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          error(`${file} does not exist.`)
          reject(err)
          process.exit(1)
        }
        fs.readFile(filePath, (err, data) => {
          if (err) {
            err(`${file} read error.`)
            console.error(err)
            reject(err)
            process.exit(0)
          }
          linter.lint(file, data.toString('utf-8'), configFile)
          resolve()
        })
      })
    })
  }))

  const result = linter.getResult()

  // files that was auto-fixed
  const hasFixed = result.fixes.length > 0
  if (hasFixed) {
    log(`The following files have been auto-fixed:`)
    log()
    const fixedFiles = [...new Set(result.fixes.map(f => f.fileName || ''))].filter(Boolean)
    fixedFiles.forEach(fileName => {
        log(`  ${chalk.blue(fileName)}`)
    })
    log()
  }
  
  const eNum = result.errorCount
  const wNum = result.warningCount
  if (eNum || wNum) {
    // log lint errors
    console.log(result.output)

    // log count of lint errors
    console.log(chalk.bold.red(`${
      (eNum ? eNum + ' error' + (eNum > 1 ? 's' : '') : '') +
      (eNum && wNum ? ' and ' : '') +
      (wNum ? wNum + ' warning' + (wNum > 1 ? 's' : '') : '') + 
      ' found.'
    }`))

    // log count of errors that can be auto-fixed
    const failNumCanBeFixed = result.failures.filter(fail => fail.fix).length
    failNumCanBeFixed && console.log(chalk.bold.red(`${failNumCanBeFixed} error${failNumCanBeFixed > 1 ? 's' : ''} potentially fixable with the \`npm run lint:fix\` command.`))

    // fail build if any lint errors found
    if (config.failBuild) {
      error(`Build failed due to lint errors!`)
      process.exit(0)
    }
  } else {
    done(hasFixed ? `All lint errors auto-fixed.` : `No lint errors found!`)
  }
}