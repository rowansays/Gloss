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
  const { gloss, refs } = props
  const sorted = gloss.sortDefsByName()

  const defs = []
  sorted.defs.forEach((quote, i) => {
    let def
    if (quote.getSize() > 1) {
      def = <DefinitionMultiple quote={quote} refs={refs} />
    } else {
      def = <DefinitionSingle quote={quote} refs={refs} />
    }
    defs.push(def)
  })

  return (
    <tbody class='Gloss'>
      <th class='GlossName' colspan='2'>{gloss.getName()}</th>
      {defs}
    </tbody>
  )
}

/**
 * Multiple table rows for all quotes within a definition
 */
function DefinitionSingle (props) {
  const { quote, refs } = props
  return (
    <>
      <tr class='Head'>
        <td class='Term'>{quote.getName()}</td>
        <Quote quote={quote} refs={refs} />
      </tr>
    </>
  )
}
function DefinitionMultiple (props) {
  const { quote, refs } = props
  const head = quote.slice(0, 1)
  const tail = quote.slice(1)
  return (
    <>
      <tr class='Head'>
        <td class='Term' rowspan={quote.getSize()}>
          {quote.getName()}
        </td>
        <Quote quote={head} refs={refs} />
      </tr>
      <Quotes quotes={tail} refs={refs} />
    </>
  )
}

function Quotes (props) {
  const { quotes, refs } = props

  const rows = []
  quotes.forEach(quote => {
    rows.push(<tr><Quote quote={quote} refs={refs} /></tr>)
  })

  return (<>{rows}</>)
}

function Quote (props) {
  const { quote, refs } = props

  const items = []
  console.log('quote.getRefs()', quote.getRefs())
  quote.getRefs().forEach(key => {
    items.push(<span>{refs[key].title} </span>)
  })

  return (<td class='Description'>{quote.getName()} {items}</td>)
}

export { renderVerboseGlossary, VerboseGlossary }
