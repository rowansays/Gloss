import { renderGlossaryConcise } from './renderGlossaryConcise.js'
import { renderGlossaryVerbose } from './renderGlossaryVerbose.js'

function renderGlossary (type, glossary) {
  switch (type) {
    case 'concise' :
      return renderGlossaryConcise(glossary)
    case 'verbose' :
      return renderGlossaryVerbose(glossary)
    default :
      throw new Error('renderGlossary(): Glossary type is not supported.')
  }
}

export { renderGlossary }
