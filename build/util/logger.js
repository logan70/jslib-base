const chalk = require('chalk')
const readline = require('readline')
const padStart = require('string.prototype.padstart')

const format = (label, msg) => {
  return msg.split('\n').map((line, i) => {
    return i === 0
      ? `${label} ${line}`
      : padStart(line, chalk.reset(label).length)
  }).join('\n')
}

const chalkTag = msg => chalk.bgBlackBright.white.dim(` ${msg} `)

/**
 * 打印普通信息
 * @method log
 * @param {String} msg - 要打印的信息
 * @param {String} [tag] - 附加标签
 */
exports.log = (msg = '', tag = null) => {
  tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg)
}

/**
 * 打印INFO，常用于任务开始时
 * @method info
 * @param {String} msg - 要打印的信息
 * @param {String} [tag] - 附加标签
 */
exports.info = (msg = '', tag = null) => {
  const chalkMsg = format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg)
  console.log(chalkMsg)
}

/**
 * 打印DONE，常用于任务完成时
 * @method done
 * @param {String} msg - 要打印的信息
 * @param {String} [tag] - 附加标签
 */
exports.done = (msg = '', tag = null) => {
  const chalkMsg = format(chalk.bgGreen.black(' DONE ') + (tag ? chalkTag(tag) : ''), msg)
  console.log(chalkMsg)
}

/**
 * 打印WARN，常用于任务警告时
 * @method done
 * @param {String} msg - 要打印的信息
 * @param {String} [tag] - 附加标签
 */
exports.warn = (msg = '', tag = null) => {
  const chalkMsg = format(chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''), msg)
  console.log(chalkMsg)
}

/**
 * 打印ERROR，常用于任务警告时
 * @method done
 * @param {String} msg - 要打印的信息
 * @param {String} [tag] - 附加标签
 */
exports.error = (msg = '', tag = null) => {
  const chalkMsg = format(chalk.bgRed.black(' ERROR ') + (tag ? chalkTag(tag) : ''), msg)
  console.log(chalkMsg)
}

/**
 * 命令行另起一页
 * @method clearConsole
 * @param {String} title - 另起一页后要打印的信息
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
