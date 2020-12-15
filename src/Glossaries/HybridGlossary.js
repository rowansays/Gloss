/**
 * Hybrid glossary factory.
 *
 * A hybrid glossary is a work that contains a list of entries from multiple
 * references.
 *
 * @param {Work} id The identity of this glossary.
 * @param {...Glossary} ...glossaries Zero or more glossaries.
 */

import { AbstractWork } from '../Abstracts/AbstractWork.js'
import { freeze } from '../Utility/freeze.js'
import { GlossList } from '../Lists/GlossList.js'

function $HybridGlossary (id, ...glossaries) {
  AbstractWork.call(this, id)

  // A simple map of reference key strings
  this.references = {}

  const glosses = []

  glossaries = !!glossaries && Array.isArray(glossaries) ? glossaries : []
  glossaries.forEach((glossary, index) => {
    this.references[index + 1] = glossary.getRef()
    glossary.forEach(gloss => {
      glosses.push(gloss)
    })
  })

  const name = id && id.getName() ? id.getName() : 'Anonymous'
  this.glosses = GlossList({ name: name, items: glosses })
  this.length = this.glosses.length
}

$HybridGlossary.prototype = Object.create(AbstractWork.prototype)

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
