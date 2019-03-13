const path = require('path')
const { CLIEngine } = require('eslint')
const { info, done, error, log, clearConsole, chalk } = require('../util/logger.js')

const { srcType } = require('../../jslib.config')

module.exports = (args = {}) => {
  return new Promise((resolve, reject) => {
  
    const config = Object.assign({
      extensions: srcType === 'js' ? ['.js', '.jsx'] : ['.ts', '.tsx'],
      fix: false,
      // fail build if any lint errors found
      failBuild: false
    }, args)
  
    const engine = new CLIEngine(config)
  
    const defaultFilesToLint = ['src/']
  
    const files = args._ && args._.length
      ? args._
      : defaultFilesToLint
  
    const report = engine.executeOnFiles(files)
  
    const formatter = engine.getFormatter(args.format || 'codeframe')
  
    if (config.fix) {
      CLIEngine.outputFixes(report)
    }
  
    const cwd = process.cwd()
  
    // files that was auto-fixed
    const hasFixed = report.results.some(f => f.output)
    if (hasFixed) {
      log(`The following files have been auto-fixed:`)
      log()
      report.results.forEach(f => {
        if (f.output) {
          log(`  ${chalk.blue(path.relative(cwd, f.filePath))}`)
        }
      })
      log()
    }
    if (report.warningCount || report.errorCount) {
      console.log(formatter(report.results).replace('`--fix` option', '`npm run lint:fix` command'))
      
      // fail build if any lint errors found
      if (config.failBuild) {
        error(`Build failed due to lint errors!`)
        process.exit(0)
      }
      resolve(false)
    } else {
      // done(hasFixed ? `All lint errors auto-fixed.` : `No lint errors found!`)
      resolve(true)
    }
  })
}