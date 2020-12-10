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
            // Abstracts
            'AbstractObjectList',
            'AbstractQuote',
            'AbstractScalarList',
            'AbstractWork',

            // Glossaries
            'Glossary',
            'HybridGlossary',

            // Glosses
            'Term',

            // Lists
            'GlossList',
            'QuoteList',
            'ReferenceList',
            'StringList',

            // Predicates
            'isGloss',
            'isList',
            'isQuote',
            'isReference',
            'isWork',

            // Quotes
            'Normal',
            'Phrase',
            'Speech',

            // References
            'Book',
            'Webpage',

            // Utility
            'castString',

            // Other
            'Card',
          ]
        }
      })
    ]
  }
]
