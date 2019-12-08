module.exports = {
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'entry', modules: false, corejs: 3 }],
    '@babel/preset-typescript'
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread'
  ]
}
