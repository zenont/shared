import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

const input = 'src/index.ts'
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.json']

const plugins = [
  babel({
    exclude: 'node_modules/**',
    extensions
  }),
  resolve({ extensions, only: [/src/] }),
  commonjs({
    extensions
  })
]

export default {
  input,
  plugins,
  output: [
    {
      dir: 'main',
      format: 'cjs'
    },
    {
      dir: 'module',
      format: 'es'
    }
  ]
}
