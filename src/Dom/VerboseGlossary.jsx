function renderGlossaryVerbose (glossary) {
  const section = document.createElement('section')
  const heading = document.createElement('h1')
  const headingText = document.createTextNode(glossary.getTitle())

  heading.appendChild(headingText)
  section.classList.add('GlossaryVerbose')
  section.appendChild(heading)
  return section
}

export { renderGlossaryVerbose }
