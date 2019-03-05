const { chalk } = require('./logger')
const DraftLog = require('draftlog')
DraftLog(console)

module.exports = class Spinner {
  /**
   * Creates an instance of Spinner.
   * @date 2019-03-05
   * @param {Object} [options]
   * @param {String} [options.message] - main message to output, default to be 'Building'
   * @param {String[]} [options.frames] - a list of spinners displayed looply before main message, default to be ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
   * @param {Number} [options.interval] - interval of loop, default to be 80
   * @param {Boolean} [options.needDots] - need three dots after main message or not, default to be true
   */
  constructor(options = {}) {
    this.defaultMessage = options.message || 'Building'
    this.frames = options.frames || ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    this.interval = options.interval || 80
    this.message = options.message || 'Building'
    this.logIndex = 0
    this.timer = null
    this.needDots = options.needDots || true
  }

  // log spinner
  log() {
    this.message = this.defaultMessage
    this.draft = console.draft()
    const len = this.frames.length
    this.timer = setInterval(() => {
      this.draft(chalk.cyan(`${this.frames[this.logIndex % len]} ${this.message}${this.needDots ? '...' : ''}`))
      this.logIndex  += 1
    }, this.interval)
  }

  /**
   * @description change main message
   * @param {string} [msg='Building'] - default to be 'Building'
   */
  setMessage(msg = 'Building') {
    this.message = msg
  }

  // stop logging
  clear() {
    this.setMessage('')
    clearInterval(this.timer)
    this.draft('')
    this.timer = null
  }
}