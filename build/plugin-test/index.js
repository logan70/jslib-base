const { spawn } = require('child_process')
const { jestConfigPath } = require('../../jslib.config')

module.exports = (args = {}) => {
  return new Promise((resolve, reject) => {
    const cliOptions = ['--config', jestConfigPath]
    if (args.coverage) {
      cliOptions.push('--collectCoverage')
    }
    console.log(cliOptions)
    spawn('jest', cliOptions, {
      stdio: 'inherit'
    })
    resolve()
  })
}