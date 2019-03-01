const path = require('path')

/**
 * get rollup configuration
 * @param {String} configFile - rollup configuration file name. e.g., 'rollup.config.aio.js'
 * @return {Object} rollup config object
 */
module.exports = (configFile) => require(path.resolve(__dirname, '../rollupConfig', configFile))