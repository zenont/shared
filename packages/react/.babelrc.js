module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  plugins: [
    'babel-plugin-emotion',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator'
  ]
}
