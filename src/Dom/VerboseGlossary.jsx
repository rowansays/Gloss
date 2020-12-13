import { render } from 'preact'

/**
 * Render Verbose glossary.
 *
 * @return {Element} Section element.
 */
function renderVerboseGlossary () {
  const fragment = document.createDocumentFragment()
  render(VerboseGlossary(...arguments), fragment)
  return fragment
}

function VerboseGlossary (glossary) {
  const glosses = []
  glossary.forEach(gloss => {
    glosses.push(<Gloss gloss={gloss} />)
  })

  return (
    <section class='GlossaryVerbose'>
      <h1 class='GlossaryTitle'>{glossary.getTitle()}</h1>
      <table class='GlossList'>
        <thead>
          <tr>
            <th>Definition</th>
            <th>References</th>
          </tr>
        </thead>
        <tbody>
          {glosses}
        </tbody>
      </table>
    </section>
  )
}

function Gloss (props) {
  const { gloss } = props
  const sorted = gloss.sortDefsByName()

  const defs = []
  sorted.defs.forEach((def, i) => {
    defs.push(
      <tr>
        <td>{def.getName()}</td>
        <td><q>{def.getFull()}</q></td>
      </tr>
    )
  })

  return (
    <>
      <th class='GlossName' colspan='2'>{gloss.getName()}</th>
      {defs}
    </>
  )
}

export { renderVerboseGlossary, VerboseGlossary }
