const { srcType } = require('../../jslib.config')

module.exports = async (args = {}) => {
  const runnerFile = `./${srcType}doc.js`
  const runner = require(runnerFile)
  await runner(args)
}