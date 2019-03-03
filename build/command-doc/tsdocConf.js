const { name } = require('../../package.json')

module.exports = {
  // name of the project that will be used in the header of the template.
  name,
  mode: 'Modules',
  outputDir: 'docs/',
  target: 'ESNext',
  module: 'ES6',
  // Specify the logger that should be used, 'none' or 'console'
  logger: 'none',
  experimentalDecorators: true,
  // Pass `none` to disable the index page and start the documentation on the globals page.
  readme: 'README.md',
  // Do not print the TypeDoc link at the end of the page.
  hideGenerator: true
}