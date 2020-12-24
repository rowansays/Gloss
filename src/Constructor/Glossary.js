/**
 * Glossary factory.
 *
 * A glossary is a work that contains a list of entries from a single reference.
 *
 * @param {Work} The identity of this glossary.
 * @param {string} referenceKey The key of the {Reference} from which all
 *   glosses originate.
 * @param {Gloss} ...glosses  Zero or more glosses.
 */

import { AbstractNamed } from '../Abstracts/AbstractNamed.js'
import { $GlossList } from '../Constructor/GlossList.js'

function $Glossary (props) {
  const { ref, glosses } = props || {}
  AbstractNamed.call(this, props)

  const refGlosses = []
  if (!!glosses && typeof glosses.forEach === 'function') {
    glosses.forEach(gloss => {
      refGlosses.push(gloss.root(ref).applyRefs())
    })
  }

  this.glosses = new $GlossList(...refGlosses)
  this.length = this.glosses.length
  this.ref = ref

  Object.freeze(this)
}

$Glossary.prototype = Object.create(AbstractNamed.prototype)

Object.defineProperty($Glossary.prototype, 'constructor', { value: $Glossary })

$Glossary.prototype.forEach = function () {
  return this.glosses.forEach(...arguments)
}
$Glossary.prototype.getGloss = function (key) {
  return this.glosses.get(key)
}
$Glossary.prototype.getRef = function () {
  return this.ref
}

Object.freeze($Glossary.prototype)

export { $Glossary }
