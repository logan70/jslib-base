const { srcType } = require('../../jslib.config')

module.exports = async (args = {}) => {
  const runnerFile = `./${srcType}doc.js`
  const runner = require(runnerFile)
  const result = await runner(args)
  return result
}