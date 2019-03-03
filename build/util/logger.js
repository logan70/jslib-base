const chalk = require('chalk')
const readline = require('readline')

const format = (label, msg) => {
  return msg.split('\n').map((line, i) => {
    return i === 0
      ? `${label} ${line}`
      : line
  }).join('\n')
}

const chalkTag = msg => chalk.bgBlackBright.white.dim(` ${msg} `)

/**
 * output info
 * @method log
 * @param {String} msg - message to output
 * @param {String} [tag] - tag
 */
exports.log = (msg = '', tag = null) => {
  tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg)
}

/**
 * output start info
 * @method info
 * @param {String} msg - message to output
 * @param {String} [tag] - tag
 */
exports.info = (msg = '', tag = null) => {
  const chalkMsg = format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg)
  console.log(chalkMsg)
}

/**
 * output success info
 * @method done
 * @param {String} msg - message to output
 * @param {String} [tag] - tag
 */
exports.done = (msg = '', tag = null) => {
  const chalkMsg = format(chalk.bgGreen.black(' DONE ') + (tag ? chalkTag(tag) : ''), msg)
  console.log(chalkMsg)
}

/**
 * output warning info
 * @method done
 * @param {String} msg - message to output
 * @param {String} [tag] - tag
 */
exports.warn = (msg = '', tag = null) => {
  const chalkMsg = format(chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''), msg)
  console.log(chalkMsg)
}

/**
 * output error info
 * @method done
 * @param {String} msg - message to output
 * @param {String} [tag] - tag
 */
exports.error = (msg = '', tag = null) => {
  const chalkMsg = format(chalk.bgRed.black(' ERROR ') + (tag ? chalkTag(tag) : ''), msg)
  console.log(chalkMsg)
}

/**
 * clear command line
 * @method clearConsole
 * @param {String} [title] - message to output after clear
 */
exports.clearConsole = (title) => {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows)
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
    if (title) {
      console.log(title)
    }
  }
}

exports.chalk = require('chalk')
