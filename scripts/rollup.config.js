import path from 'path'
import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import external from '@yelo/rollup-node-external'
import { uglify } from 'rollup-plugin-uglify'
import { pascalCase } from 'change-case'

const { PACKAGES_SRC_DIR, PACKAGES_OUT_DIR } = require('./getPackageNames')

const packageName = process.env.PACKAGE_NAME

const libraryName = pascalCase(packageName)

const input = `./${path.join(PACKAGES_SRC_DIR, packageName, 'index.js')}`

const outDir = path.join(PACKAGES_OUT_DIR, packageName, 'dist')

const getBabelOptions = ({ useESModules }) => ({
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    plugins: [['@babel/transform-runtime', { useESModules }]],
})

export default [
    {
        input,
        output: {
            file: `${outDir}/${libraryName}.umd.js`,
            format: 'umd',
            name: libraryName,
            globals: {
                react: 'React',
            },
        },
        external: external(),
        plugins: [
            nodeResolve(),
            babel(getBabelOptions({ useESModules: true })),
            commonjs(),
            replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
        ],
    },

    {
        input,
        output: {
            file: `${outDir}/${libraryName}.min.js`,
            format: 'umd',
            name: libraryName,
            globals: {
                react: 'React',
            },
        },
        external: external(),
        plugins: [
            nodeResolve(),
            babel(getBabelOptions({ useESModules: true })),
            commonjs(),
            replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
            uglify(),
        ],
    },

    {
        input,
        output: {
            file: `${outDir}/${libraryName}.cjs.js`,
            format: 'cjs',
        },
        external: external(),
        plugins: [babel(getBabelOptions({ useESModules: false }))],
    },

    {
        input,
        output: {
            file: `${outDir}/${libraryName}.esm.js`,
            format: 'es',
        },
        external: external(),
        plugins: [babel(getBabelOptions({ useESModules: true }))],
    },
]
