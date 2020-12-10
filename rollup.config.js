import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default [
  {
    input: 'index.js',
    output: {
      file: 'dist/symbolism.iife.js',
      format: 'iife',
      name: 'LibGlossary'
    },
    plugins: [
      commonjs(),
      nodeResolve()
    ]
  }
]
