const glob = require('glob')

// 数组扁平化
const flattenArray = arr => arr.reduce((result, cur) => Array.isArray(cur) ? [...result, ...flattenArray(cur)] : [...result, cur], [])

// 数组去重
const deduplicate = arr => Array.from(new Set(arr))

// 去除字符串前后单引号
const trimSingleQuotes = str => str.replace(/^'|'$/g, "")

/**
 * 
 * @param {String[]} files 
 * @param {String} file - 文件名或glob匹配字符串
 * @return {String[]} 经过glob匹配后的所有文件
 */
module.exports = (files) => {
  // glob匹配，文件是否存在由glob自动完成
  files = flattenArray(files).reduce((acc, file) => {
    return [...acc, ...glob.sync(trimSingleQuotes(file), { nodir: true })]
  }, [])

  files = deduplicate(files)

  return files
}