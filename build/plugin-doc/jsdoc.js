const path = require('path')
const rimraf = require('rimraf')
const { execFile } = require('child_process')
const { info, done, log, error} = require('../util/logger.js')
const { jsDocConfigPath } = require('../../jslib.config')
const { opts } = require('./jsdocConf')

module.exports = function jsdoc(args = {}) {
  return new Promise((resolve, reject) => {
    info(`Generating documents...`)
    log()

    // clean documents output directory
    const outputDir = path.resolve(__dirname, '../../', opts.destination)
    rimraf(outputDir, (err) => {
      if (err) {
        reject(err)
        return
      }

      // generate documents
      execFile(path.resolve(__dirname, '../../node_modules/.bin/jsdoc'), ['-c', `${jsDocConfigPath}`], (err, stdout, stderr) => {
        if (err) {
          reject(err)
        }
        stdout && console.log(stdout)
        done('Documents generated successfully.')
        resolve()
      })
    })
  })
}