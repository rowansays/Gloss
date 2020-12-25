// For the scripts
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

// For the styles
import path from 'path'
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'index.js',
  output: [
    {
      file: 'dist/gloss.js',
      format: 'es',
    }
  ],
  plugins: [
    nodeResolve(),
    babel({ babelHelpers: 'bundled' }),
    commonjs(),
    postcss({
      extract: path.resolve('dist/gloss.css'),
      plugins: [autoprefixer]
    })
  ]
}
