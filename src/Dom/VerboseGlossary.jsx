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
    let def
    if (quote.getSize() > 1) {
      def = DefinitionMultiple(quote)
    } else {
      def = DefinitionSingle(quote)
    }
    defs.push(def)
  })

  return (
    <tbody class="Gloss">
      <th class='GlossName' colspan='2'>{gloss.getName()}</th>
      {defs}
    </tbody>
  )
}

/**
 * Multiple table rows for all quotes within a definition
 */
function DefinitionSingle (quote) {
  return (
    <>
      <tr class="Head">
        <td class="Term">{quote.getName()}</td>
        <Quote quote={quote} />
      </tr>
    </>
  )
}
function DefinitionMultiple (quote) {
  const head = quote.slice(0 ,1)
  const tail = quote.slice(1)
  return (
    <>
      <tr class="Head">
        <td class="Term" rowspan={quote.getSize()}>
          {quote.getName()}
        </td>
        <Quote quote={head} />
      </tr>
      <Quotes quotes={tail} />
    </>
  )
}

function Quote (props) {
  const { quote } = props
  return (<td class="Description">{quote.getName()}</td>)
}


function Quotes (props) {
  const { quotes } = props

  const rows = []
  quotes.forEach(quote => {
    rows.push(<tr><Quote quote={quote} /></tr>)
  })

  return (<>{rows}</>)
}

export { renderVerboseGlossary, VerboseGlossary }
