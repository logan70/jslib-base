const { srcType } = require('../../jslib.config')

module.exports = async (args = {}) => {
  const runnerFile = srcType === 'js' ? './lintJs.js' : './lintTs.js'
  const runner = require(runnerFile)
  const result = await runner(args)
  return result
}
