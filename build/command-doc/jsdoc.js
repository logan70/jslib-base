const path = require('path')
const rimraf = require('rimraf')
const { execFile } = require('child_process')
const { opts } = require('./jsdocConf')

module.exports = function jsdoc(args = {}) {
  return new Promise((resolve, reject) => {

    // clean documents output directory
    const outputDir = path.resolve(__dirname, '../../', opts.destination)
    rimraf(outputDir, (err) => {
      if (err) {
        reject(err)
        return
      }

      // generate documents
      execFile(
        path.resolve(__dirname, '../../node_modules/.bin/jsdoc'),
        ['-c', path.resolve(__dirname, './jsdocConf.js')],
        (err, stdout, stderr) => {
          if (err) {
            reject(err)
          }
          resolve()
        }
      )
    })
  })
}