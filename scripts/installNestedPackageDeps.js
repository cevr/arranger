const path = require('path')
const { exec } = require('shelljs')
const { PACKAGES_SRC_DIR } = require('./getPackageNames.js')

const sourceDir = path.resolve(PACKAGES_SRC_DIR)
exec(`cd ${sourceDir} && yarn`, { async: true })
