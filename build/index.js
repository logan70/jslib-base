#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const semver = require('semver')
const { info, done, warn, error, log, clearConsole } = require('./util/logger.js')
const requiredVersion = '>=8'
// check node version
if (!semver.satisfies(process.version, requiredVersion)) {
  error(
    `You are using Node ${process.version}, but @logan/jslib-base` +
    `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
  )
  process.exit(1)
}

const args = require('minimist')(process.argv.slice(2))
const command = args._[0]
// delete command from args
args._.shift()

function run(command, args) {
  const runner = require(`./plugin-${command}/index`)
  return runner(args)
}

run(command, args)
