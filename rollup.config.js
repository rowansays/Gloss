import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

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
  }
]
