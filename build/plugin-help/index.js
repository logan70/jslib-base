const art = require('ascii-art')
const chalk = require('chalk')
const padStart = require('string.prototype.padstart')
const { info, done, log, clearConsole} = require('../util/logger.js')

module.exports = () => {
  return new Promise(resolve => {
    art.font('@logan\/jslib', 'Doom', data => {
      console.log(chalk.cyan(padStart('', 71, '-')))
      console.log(chalk.cyan(data))
      console.log(chalk.cyan(padStart('', 71, '-')))
      log()
      log('Usage: npm run <command>')
      log()
      log('A good JavaScript library scaffold.')
      log()
      log('Commands:')
      log('  npm run build, output bundle files of different moudle specification.')
      log('  npm run dev, select a module type to watch and rebuild on change.')
      log('  npm run lint, lint your code by ESLint/TSLint.')
      log('  npm run lint:fix, lint your code and fixed errors and warnings that can be auto-fixed.')
      log('  npm run doc, generate API documents based on good documentation comments in source code.')
      log()
      log(`See more details at ${chalk.cyan('https://github.com/logan70/jslib')}`)
      resolve()
    })
  })
}