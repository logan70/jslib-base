const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const cliui = require('cliui')
const { chalk } = require('./logger')

// format size to 'kb' unit
const formatSize = size => (size / 1024).toFixed(2) + ' kb'

const getSize = (filePath) => {
  const stat = fs.statSync(filePath)
  return formatSize(stat.size)
}
const getGzippedSize = (filePath) => {
  const buffer = fs.readFileSync(filePath)
  return formatSize(zlib.gzipSync(buffer).length)
}

const makeRow = (a, b, c) => `  ${a}\t    ${b}\t ${c}`


/**
 * 
 * @param {String[]} files
 * @param {String} file - path of file relative to root directory
 */
module.exports = (files = []) => {
  // get size and gzipped size of file
  const assets = files.map((file) => {
    const filePath = path.resolve(__dirname, '../../', file)
    const size = getSize(filePath)
    const gzippedSize = getGzippedSize(filePath)
    return {
      file,
      size,
      gzippedSize
    }
  })

  assets.sort((a, b) => b.size - a.size)
  
  // output file status
  const ui = cliui({ width: 80 })
  ui.div(
    makeRow(
      chalk.cyan.bold(`File`),
      chalk.cyan.bold(`Size`),
      chalk.cyan.bold(`Gzipped`)
    ) + `\n\n` +
    assets.map(asset => makeRow(
      chalk.green(asset.file),
      asset.size,
      asset.gzippedSize
    )).join(`\n`)
  )
  console.log(`${ui.toString()}\n\n  ${chalk.gray(`Only js bundle files included.`)}\n`)
  return
}