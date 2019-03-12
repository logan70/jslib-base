const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')

const { info, done, log, clearConsole} = require('../util/logger.js')
const globFiles = require('../util/globFiles')
const runHelp = require('../command-help/index')

const promptArr = []
// get umdName
promptArr.push({
  type: 'input',
  name: 'umdName',
  message: 'Enter the name for umd export (used as global varible name in browsers):',
  validate(name) {
    if (/^[a-zA-Z][\w\.]*$/.test(name)) {
      return true
    } else {
      return `Invalid varible name: ${name}!`
    }
  }
})
// get library name
promptArr.push({
  type: 'input',
  name: 'libName',
  message: 'Enter the name of your project (used as npm package name):',
  validate(name) {
    if (/^[a-zA-Z@][\w-]*\/?[\w-]*$/.test(name)) {
      return true
    } else {
      return `Invalid project name: ${name}!`
    }
  }
})
// get library url
promptArr.push({
  type: 'input',
  name: 'repoUrl',
  default: 'https://github.com/logan70/jslib-base',
  message: 'Enter the url of your repository:',
  validate(url) {
    if (/^https?\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/.test(url)) {
      return true
    } else {
      return `Invalid repository url: ${url}!`
    }
  }
})

module.exports = (args = {}) => {
  return new Promise(async (resolve, reject) => {
    // get user info
    const { umdName, libName, repoUrl } = await inquirer.prompt(promptArr)

    // files need to be modified
    let files = [
      '.github/**',
      'src/**',
      'jslib.config.js',
      'package.json',
      'package-lock.json',
      'README.md'
    ]
    
    // glob pattern files
    files = globFiles(files)

    // modify files
    try {
      await Promise.all(files.map((file) => new Promise((resolve, reject) => {
        const filePath = path.resolve(__dirname, '../../', file)
        fs.readFile(filePath, 'utf8', function (err, data) {
          if (err) {
            reject(err)
            return
          }
          let result = data
            .replace(/@logan\/jslib\-base/g, libName)
            .replace(/https:\/\/github\.com\/logan70\/jslib\-base/g, repoUrl)
          
          if (file.indexOf('jslib.config.js') > -1) {
            result = result.replace(/globalName: \'_\'/g, `globalName: '${umdName}'`)
          }
        
          fs.writeFile(filePath, result, 'utf8', (err) => {
             if (err) {
               reject(err)
               return
             }
             resolve()
          })
        })
      })))

      await runHelp()
      log()
      done('Initialized successfully, enjoy coding!')
    } catch (e) {
      throw new Error(e)
    }
  })
}