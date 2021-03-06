/* eslint global-require: 0 */
/* eslint-disable import/no-dynamic-require, no-console */
const fs = require('fs')
const path = require('path')
const { exec, exit, rm, cp, test } = require('shelljs')
const chalk = require('chalk')
const { flowRight: compose } = require('lodash')
const readline = require('readline-sync')
const semver = require('semver')
const { PACKAGES_SRC_DIR, PACKAGES_OUT_DIR } = require('./getPackageNames')

const BIN = './node_modules/.bin'

const BASE_PACKAGE_LOC = '../basePackage.json'

const consoleLog = console.log.bind(console)
const log = compose(
    consoleLog,
    chalk.bold,
)
const logSuccess = compose(
    consoleLog,
    chalk.green.bold,
)
const logError = compose(
    consoleLog,
    chalk.red.bold,
)

const writeFile = (filepath, string) =>
    fs.writeFileSync(filepath, string, 'utf8')

try {
    if (exec('git diff-files --quiet').code !== 0) {
        logError(
            'You have unsaved changes in the working tree. ' +
                'Commit or stash changes before releasing.',
        )
        exit(1)
    }

    const packageName = 'arranger'

    const versionLoc = path.resolve(PACKAGES_SRC_DIR, 'VERSION')
    const version = fs.readFileSync(versionLoc, 'utf8').trim()

    let nextVersion = readline.question(
        `Next version of ${packageName} (current version is ${version}): `,
    )

    while (
        !(
            !nextVersion ||
            (semver.valid(nextVersion) && semver.gt(nextVersion, version))
        )
    ) {
        nextVersion = readline.question(
            `Must provide a valid version that is greater than ${version}, ` +
                'or leave blank to skip: ',
        )
    }

    log('Running tests...')

    if (exec('yarn run lint && yarn test').code !== 0) {
        logError('The test command did not exit cleanly. Aborting release.')
        exit(1)
    }

    logSuccess('Tests were successful.')

    const sourceDir = path.resolve(PACKAGES_SRC_DIR)
    const outDir = path.resolve(PACKAGES_OUT_DIR)

    log('Cleaning destination directory...')
    rm('-rf', outDir)

    log('Compiling source files...')

    exec(
        'cross-env NODE_ENV=cjs ' +
            `${path.resolve(BIN)}/babel ${sourceDir} ` +
            `--out-dir ${path.resolve(
                outDir,
            )} --ignore="**/__tests__/**,**/node_modules/**"`,
    )

    log('Copying additional project files...')
    const additionalProjectFiles = ['README.md', '.npmignore', 'index.d.ts']
    additionalProjectFiles.forEach(filename => {
        const src = path.resolve(sourceDir, filename)

        if (!test('-e', src)) return

        cp('-Rf', src, outDir)
    })

    log('Generating package.json...')
    const packageConfig = Object.assign(
        { name: packageName, version: nextVersion },
        require(BASE_PACKAGE_LOC),
        require(path.resolve(sourceDir, 'package.json')),
    )

    writeFile(
        path.resolve(outDir, 'package.json'),
        JSON.stringify(packageConfig, null, 2),
    )

    log('Copying license...')
    cp('-f', 'LICENSE.md', outDir)

    log('Adding types...')
    cp('-f', 'index.d.ts', outDir)

    log(`Building ${packageName}...`)
    const runRollup = () => `yarn build`
    if (exec(runRollup()).code !== 0) {
        exit(1)
    }

    log(`About to publish ${packageName}@${nextVersion} to npm.`)
    if (!readline.keyInYN('Sound good? ')) {
        log('OK. Stopping release.')
        exit(0)
    }

    log('Publishing...')
    if (exec(`cd ${outDir} && npm publish`).code !== 0) {
        logError('Publish failed. Aborting release.')
        exit(1)
    }

    logSuccess(`${packageName}@${nextVersion} was successfully published.`)

    log('Updating VERSION file...')
    writeFile(versionLoc, `${nextVersion}\n`)

    log('Committing changes...')
    const newTagName = `v${nextVersion}`
    exec(`git add ${versionLoc}`)
    exec(`git commit -m "${packageName} ${newTagName}"`)

    if (packageName === 'arranger') {
        log(`Tagging release... (${newTagName})`)
        exec(`git tag ${newTagName}`)
    }

    log('Pushing to GitHub...')
    exec('git push')
    exec('git push --tags')

    logSuccess('Done.')
} catch (error) {
    logError('Release failed due to an error', error)
}
