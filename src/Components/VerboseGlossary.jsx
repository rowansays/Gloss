import { render } from 'preact'

/**
 * Render Verbose glossary.
 *
 * @return {Element} Section element.
 */
function renderVerboseGlossary (...args) {
  const fragment = document.createDocumentFragment()
  const props = {
    glossary: args[0],
    refs: args[1]
  }
  render(VerboseGlossary(props), fragment)
  return fragment
}

function VerboseGlossary (props) {
  const { glossary, refs } = props
  const glosses = []
  glossary.forEach(gloss => {
    glosses.push(<Gloss gloss={gloss} refs={refs} />)
  })

  return (
    <section class='GlossaryVerbose'>
      <h1 class='GlossaryTitle'>{glossary.name}</h1>
      <table class='GlossList'>
        {glosses}
      </table>
    </section>
  )
}
/**
 * Table body element
 */
function Gloss (props) {
  const { gloss } = props
  const sorted = gloss.sortDefsByName()

  const defs = []
  sorted.defs.forEach((def, i) => {
    defs.push(<Definition def={def} />)
  })

  return (
    <tbody class='Gloss'>

      <th class='GlossName' colspan='3'>{gloss.name}</th>
      <tr class="GlossColumns">
        <th>Definition</th>
        <th>Date</th>
        <th>Mention</th>
      </tr>
      {defs}
    </tbody>
  )
}
function Definition (props) {
  const { def } = props
  const name = def.name
  const map = def.mapBy('datePublished')
  const sorted = new Map([...map].sort((a, b) => a[0] - b[0]))
  const rows = []

  let yearNow
  let i = 1
  sorted.forEach((quotes, year) => {
    quotes.forEach(quote => {
      if (i === 1) {
        rows.push(
          <tr class='Definition'>
            <td class='DefinitionTerm' rowspan={def.length}>{name}</td>
            <td class='DefinitionYear' rowspan={quotes.length}>{year}</td>
            <td class='DefinitionData'><DataCell quote={quote} /></td>
          </tr>
        )
      } else if (year !== yearNow) {
        rows.push(
          <tr class='Definition'>
            <td class='DefinitionYear' rowspan={quotes.length}>{year}</td>
            <td class='DefinitionData'><DataCell quote={quote} /></td>
          </tr>
        )
      } else {
        rows.push(
          <tr class='Definition'>
            <td class='DefinitionData'><DataCell quote={quote} /></td>
          </tr>
        )
      }
      i = i + 1
      yearNow = year
    })
  })

  return (<>{rows}</>)
}
function DataCell (props) {
  const { quote } = props
  const reduced = quote.reduce()

  const refs = reduced
    .map(ref => (<i key={ref.name}>{ref.name}</i>))
    .reduce((a, b) => [a, ', ', b])

  return (
    <span>{reduced.name} - {refs}</span>
  )
}

export { renderVerboseGlossary, VerboseGlossary }
