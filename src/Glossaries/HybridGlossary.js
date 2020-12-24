/**
 * Hybrid glossary factory.
 *
 * A hybrid glossary is a work that contains a list of entries from multiple
 * references.
 *
 * @param {Work} id The identity of this glossary.
 * @param {...Glossary} ...glossaries Zero or more glossaries.
 */

import { AbstractNamed } from '../Abstracts/AbstractNamed.js'
import { freeze } from '../Utility/freeze.js'
import { $GlossList } from '../Constructor/GlossList.js'

function $HybridGlossary (props) {
  AbstractNamed.call(this, props)

  // A simple map of reference key strings
  this.references = {}

  const glosses = []

  props.glossaries = !!props.glossaries && Array.isArray(props.glossaries)
    ? props.glossaries
    : []

  props.glossaries.forEach((glossary, index) => {
    this.references[index + 1] = glossary.getRef()
    glossary.forEach(gloss => {
      glosses.push(gloss)
    })
  })

  this.glosses = new $GlossList(...glosses)
  this.length = this.glosses.length
}

$HybridGlossary.prototype = Object.create(AbstractNamed.prototype)

Object.defineProperty($HybridGlossary.prototype, 'constructor', {
  value: $HybridGlossary
})

$HybridGlossary.prototype.forEach = function () {
  return this.glosses.forEach(...arguments)
}
$HybridGlossary.prototype.getRef = function (index) {
  index = Number.isInteger(index) ? index : 1
  return this.references[index] ? this.references[index] : ''
}

function HybridGlossary () {
  const obj = new $HybridGlossary(...arguments)
  freeze(obj, $HybridGlossary)
  return obj
}

export { HybridGlossary }
