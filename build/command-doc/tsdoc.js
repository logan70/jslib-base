const path = require('path')
const rimraf = require('rimraf')
const TypeDoc = require('typedoc')

module.exports = async function tsdoc(args = {}) {
  return new Promise((resolve, reject) => {

    const tsdocConf = require(path.resolve(__dirname, './tsdocConf'))
  
    const config = {
      ...tsdocConf,
      ...args
    }
  
    const app = new TypeDoc.Application(config)
    const project = app.convert(app.expandInputFiles(['src']))
    
    if (project) { // Project may not have converted correctly
      // clean documents output directory
      const outputDir = config.outputDir
      rimraf(path.resolve(__dirname, '../../', config.outputDir), (err) => {
        if (err) {
          reject(err)
          return
        }

        // Rendered docs
        app.generateDocs(project, outputDir)

        // Alternatively generate JSON output
        // app.generateJson(project, outputDir + '/documentation.json')

        resolve()
      })
    } else {
      reject('TypeDoc project may not have converted correctly')
    }
  })
}