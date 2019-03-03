const { spawnSync } = require('child_process')

module.exports = (args = {}) => {
  return new Promise(resolve => {
    const cliOptions = ['--config', 'build/command-test/jest.config.js']
    // collect coverage infomation or not
    if (args.coverage) {
      cliOptions.push('--collectCoverage')
    }
    spawnSync('jest', cliOptions, {
      stdio: 'inherit'
    })
    resolve()
  })
}