module.exports = {
  presets: [['@babel/env', { loose: true }], '@babel/react'],
}

if (process.env.NODE_ENV === 'cjs') {
  module.exports.plugins.push('@babel/transform-runtime')
}
