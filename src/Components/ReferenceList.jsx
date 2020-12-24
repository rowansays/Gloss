import { render } from 'preact'

export function renderReferenceList () {
  const fragment = document.createDocumentFragment()
  render(ReferenceList(...arguments), fragment)
  return fragment
}

export function ReferenceList (props) {
  const { list } = props

  return (
    <ul>{list}</ul>
  )
}

export function ReferenceListItem (props) {
  const list = { props }
  return (
    <ul>{list}</ul>
  )
}
