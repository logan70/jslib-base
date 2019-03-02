const { spawn } = require('child_process')
const { jestConfigPath } = require('../../jslib.config')

module.exports = (args = {}) => {
  return new Promise((resolve, reject) => {
    spawn('jest', ['--config', jestConfigPath], {
      stdio: 'inherit'
    })
    resolve()
  })
}