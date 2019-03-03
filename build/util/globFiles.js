const glob = require('glob')

// flatten Array
const flatten = arr => arr.reduce((result, cur) => Array.isArray(cur) ? [...result, ...flatten(cur)] : [...result, cur], [])

// deduplicate Array
const deduplicate = arr => Array.from(new Set(arr))

// trim single quotes of string
const trimSingleQuotes = str => str.replace(/^'|'$/g, "")

/**
 * 
 * @param {String[]} files 
 * @param {String} file - path or glob pattern
 * @return {String[]} a list of path that matched
 */
module.exports = (files) => {
  files = flatten(files).reduce((acc, file) => {
    return [...acc, ...glob.sync(trimSingleQuotes(file), { nodir: true })]
  }, [])

  files = deduplicate(files)

  return files
}