import { render } from 'preact'
import { ConciseGlossary } from './ConciseGlossary.jsx'
import { VerboseGlossary } from './VerboseGlossary.jsx'
<<<<<<< HEAD
import { HybridGlossary } from '../Utility/factory.js'
=======
import { HybridGlossary } from '../Glossaries/HybridGlossary.js'
>>>>>>> bfe3cd1f58460ebcd860548712b9970d2c75dc48

/**
 * Render glossary.
 *
 * @return {Element} Section element.
 */
function renderGlossary () {
  const fragment = document.createDocumentFragment()
  render(Glossary(...arguments), fragment)
  return fragment
}

function Glossary (props) {
  const { heading, glossaries } = props

  const hybrid = HybridGlossary({
    name: heading,
    glossaries: glossaries
  })

  return (
    <>
      <VerboseGlossary glossary={hybrid} />
      <ConciseGlossary glossary={hybrid} />
    </>
  )
}

export { renderGlossary, Glossary }
