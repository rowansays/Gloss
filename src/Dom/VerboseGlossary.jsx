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
      <h1 class='GlossaryTitle'>{glossary.getTitle()}</h1>
      <table class='GlossList'>
        <thead>
          <tr>
            <th>Definition</th>
            <th>Date</th>
            <th>Mention</th>
          </tr>
        </thead>
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
  sorted.defs.forEach((quote, i) => {
    defs.push(<Definition quote={quote} />)
  })

  return (
    <tbody class='Gloss'>
      <th class='GlossName' colspan='3'>{gloss.getName()}</th>
      {defs}
    </tbody>
  )
}
function Definition (props) {
  const { quote } = props
  const name = quote.getName()
  const map = quote.mapBy('year')
  const sorted = new Map([...map].sort((a, b) => a[0] - b[0]))
  const rows = []

  let yearNow
  let i = 1
  sorted.forEach((quotes, year) => {
    quotes.forEach(subQuote => {
      if (i === 1) {
        rows.push(
          <tr class='Definition'>
            <td class='DefinitionTerm' rowspan={quote.mentions}>{name}</td>
            <td class='DefinitionYear' rowspan={quotes.length}>{year}</td>
            <td class='DefinitionData'><DataCell quote={subQuote} /></td>
          </tr>
        )
      } else if (year !== yearNow) {
        rows.push(
          <tr class='Definition'>
            <td class='DefinitionYear' rowspan={quotes.length}>{year}</td>
            <td class='DefinitionData'><DataCell quote={subQuote} /></td>
          </tr>
        )
      } else {
        rows.push(
          <tr class='Definition'>
            <td class='DefinitionData'><DataCell quote={subQuote} /></td>
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
  return (
    <span>{quote.getName()} - {quote.getRef(0).getName()}</span>
  )
}

export { renderVerboseGlossary, VerboseGlossary }
