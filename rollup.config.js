import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default [
  {
    input: 'index.js',
    output: {
      file: 'dist/symbolism.iife.js',
      format: 'iife',
      name: 'Symbolism'
    },
    plugins: [
      commonjs(),
      nodeResolve(),
      terser({
        mangle: {
          reserved: [
            'AbstractWork',
            'Book',
            'Card',
            'Glossary',
            'HybridGlossary',
            'isCitation',
            'isSource',
            'isWork',
            'Term',
            'Webpage'

            // Quotes
            'Normal',
            'Phrase',
            'Speech',
          ]
        }
      })
    ]
  }
]
