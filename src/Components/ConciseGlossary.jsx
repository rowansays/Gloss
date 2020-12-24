import { render } from 'preact'

/**
 * Render concise glossary.
 *
 * @return {Element} Section element.
 */
function renderConciseGlossary () {
  const fragment = document.createDocumentFragment()
  render(ConciseGlossary(...arguments), fragment)
  return fragment
}

function ConciseGlossary (glossary) {
  const glosses = []
  glossary.forEach(gloss => {
    glosses.push(<Gloss gloss={gloss} />)
  })

  return (
    <section class='GlossaryConcise'>
      <h1 class='GlossaryTitle'>{glossary.name}</h1>
      <dl class='GlossList'>{glosses}</dl>
    </section>
  )
}

function Gloss (props) {
  const { gloss } = props
  const sorted = gloss.sortDefsByName()
  const size = sorted.length
  const defs = []

  sorted.defs.forEach((def, i) => {
    const seperator = i < size - 1 ? ', ' : ''
    defs.push(<GlossDef def={def} seperator={seperator} />)
  })

  return (
    <>
      <GlossName gloss={gloss} />
      {defs}
    </>
  )
}

/**
 * Render a name of a gloss.
 *
 * @param {Quote} def The definition to render.
 */
function GlossName (props) {
  const { gloss } = props
  return (
    <dt class='GlossName'>{gloss.name}</dt>
  )
}

/**
 * Render a definition for a gloss.
 *
 * @param {Quote} def The definition to render.
 */
function GlossDef (props) {
  const { def, seperator } = props
  return (
    <dd class='GlossDef'>
      <span>{def.name}</span>{seperator}
    </dd>
  )
}

export { renderConciseGlossary, ConciseGlossary }
