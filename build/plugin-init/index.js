const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')

const { info, done, log, clearConsole} = require('../util/logger.js')
const globFiles = require('../util/globFiles')
const runHelp = require('../plugin-help/index')

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
// get library name
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
      'build/plugin-doc/tsdocConf.js',
      'src/**',
      'jslib.config.js',
      'package.json',
      'package-lock.json',
      'README.md',
      '__tests__/**'
    ]
    
    // glob匹配后的所有文件数组
    files = globFiles(files)

    // 去除字符串前后单引号
    const trimSingleQuotes = str => str.replace(/^'|'$/g, "")

    // 文件替换内容
    try {
      await Promise.all(files.map((file) => new Promise((resolve, reject) => {
        const filePath = path.resolve(__dirname, '../../', file)
        fs.readFile(filePath, 'utf8', function (err, data) {
          if (err) {
            reject(err)
            return
          }
          const result = data
            .replace(/umdName/g, umdName)
            .replace(/@logan\/jslib\-base/g, libName)
            .replace(/https:\/\/github\.com\/logan70\/jslib/g, repoUrl)
        
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