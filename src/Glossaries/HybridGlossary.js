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
    this.references[index + 1] = glossary.getReference()
    glossary.forEach(gloss => {
      glosses.push(gloss)
    })
  })

  this.glosses = GlossList(...glosses)
}

$HybridGlossary.prototype = Object.create(AbstractWork.prototype)

$HybridGlossary.prototype.forEach = function () {
  return this.glosses.forEach(...arguments)
}
$HybridGlossary.prototype.getReference = function (index) {
  index = Number.isInteger(index) ? index : 1
  return this.references[index] ? this.references[index] : ''
}
$HybridGlossary.prototype.getSize = function () {
  return this.glosses.getSize()
}

/**
 * Hybrid glossary factory.
 *
 * A hybrid glossary is a work that contains a list of entries from multiple
 * glossaries.
 *
 * @param {Work} id The identity of this glossary.
 * @param {string} referenceKey The key of the {Reference} from which all
 *   glosses originate.
 * @param {Gloss} ...glossaries  Zero or more glossaries.
 */
function HybridGlossary () {
  const obj = new $HybridGlossary(...arguments)
  freeze(obj, $HybridGlossary)
  return obj
}

export { HybridGlossary }
