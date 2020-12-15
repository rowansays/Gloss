function renderReferenceList () {
  const fragment = document.createDocumentFragment()
  render(ReferenceList(...arguments), fragment)
  return fragment
}

function ReferenceList (props) {
  const { list } = props

  return (
    <ul>{refs}</ul>
  )
}

function ReferenceListItem (props) {
  const list = {props}
  return (
    <ul>{refs}</ul>
  )
}
