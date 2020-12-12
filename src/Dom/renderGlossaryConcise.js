/**
 * Render concise glossary.
 *
 * @return {Element} Section element.
 */
function renderGlossaryConcise (glossary) {
  const section = document.createElement('section')
  const heading = document.createElement('h1')
  const headingText = document.createTextNode(glossary.getTitle())

  heading.appendChild(headingText)
  section.classList.add('GlossaryConcise')
  section.appendChild(heading)
  section.appendChild(renderGlossList(glossary))
  return section
}
/**
 * Render gloss list.
 *
 * @return {Element} Definition list element.
 */
function renderGlossList (glossary) {
  const list = document.createElement('dl')
  list.classList.add('GlossList')
  glossary.forEach(gloss => {
    list.appendChild(renderGloss(gloss))
  })
  return list
}

function renderGloss (gloss) {
  const sortedGloss = gloss.sortDefsByName()
  const size = sortedGloss.getSize()

  const dt = document.createElement('dt')
  dt.classList.add('GlossName')
  dt.appendChild(document.createTextNode(sortedGloss.getName()))

  const fragment = document.createDocumentFragment()
  fragment.appendChild(dt)
  sortedGloss.defs.forEach((def, i) => {
    fragment.appendChild(renderDefintion(def, i, size))
  })
  return fragment
}

function renderDefintion (phrase, i, total) {
  const dd = document.createElement('dd')
  const span = document.createElement('span')
  const quote = phrase.getFull()

  if (quote !== '') {
    dd.title = quote
  }

  span.appendChild(document.createTextNode(phrase.getName()))
  dd.appendChild(span)

  if (i < total - 1) {
    dd.appendChild(document.createTextNode(', '))
  }

  return dd
}

export { renderGlossaryConcise }
