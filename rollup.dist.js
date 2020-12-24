// For the scripts
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

// For the styles
import path from 'path'
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss'

export default [
  {
    input: 'index.js',
    output: {
      file: 'dist/gloss.iife.js',
      format: 'iife',
      name: 'LibGlossary'
    },
    plugins: [
      nodeResolve(),
      babel({ babelHelpers: 'bundled' }),
      commonjs()
    ]
  },
  {
    input: 'index.js',
    output: {
      file: 'dist/gloss.module.js',
      format: 'es',
    },
    plugins: [
      nodeResolve(),
      babel({ babelHelpers: 'bundled' }),
      commonjs()
    ]
  },
  {
    input: 'style.js',
    output: {
      file: 'dist/rowansays-gloss-temp',
      format: 'es'
    },
    onwarn: message => {
      if (!!message && message.code === 'EMPTY_BUNDLE') {
        return false
      }
    },
    plugins: [
      postcss({
        extract: path.resolve('dist/gloss.css'),
        plugins: [autoprefixer]
      })
    ]
  }
]
