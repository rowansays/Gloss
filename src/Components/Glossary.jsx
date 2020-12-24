import { render } from 'preact'
import { ConciseGlossary } from './ConciseGlossary.jsx'
import { VerboseGlossary } from './VerboseGlossary.jsx'
import { HybridGlossary } from '../Utility/factory.js'

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
