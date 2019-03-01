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
    // lint出错时是否阻止构建
    failBuild: false,
    ignore: '**/*.js',
    tslintConfigPath: 'tslint.json'
  }, args)

  const defaultFilesToLint = ['src/**/*.ts']

  let files = args._ && args._.length
    ? args._
    : defaultFilesToLint

  // glob匹配后的所有文件数组
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

  // 打印被自动修复的文件
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
    // 打印lint错误信息
    console.log(result.output)

    // 打印错误数量
    console.log(chalk.bold.red(`${
      (eNum ? eNum + ' error' + (eNum > 1 ? 's' : '') : '') +
      (eNum && wNum ? ' and ' : '') +
      (wNum ? wNum + ' warning' + (wNum > 1 ? 's' : '') : '') + 
      ' found.'
    }`))

    // 打印可被自动修复的错误数量
    const failNumCanBeFixed = result.failures.filter(fail => fail.fix).length
    failNumCanBeFixed && console.log(chalk.bold.red(`${failNumCanBeFixed} error${failNumCanBeFixed > 1 ? 's' : ''} potentially fixable with the \`npm run lint:fix\` command.`))

    // 出错阻止构建
    if (config.failBuild) {
      error(`Build failed due to lint errors!`)
      process.exit(0)
    }
  } else {
    done(hasFixed ? `All lint errors auto-fixed.` : `No lint errors found!`)
  }
}