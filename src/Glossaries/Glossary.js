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

import { AbstractWork } from '../Abstracts/AbstractWork.js'
import { castString } from '../Utility/castString.js'
import { freeze } from '../Utility/freeze.js'
import { GlossList } from '../Lists/GlossList.js'

function $Glossary (props) {
  let { id, ref, glosses } = props || {}
  ref = castString(ref)

  AbstractWork.call(this, id)

  const refGlosses = []
  if (!!glosses && typeof glosses.forEach === 'function') {
    glosses.forEach(gloss => {
      refGlosses.push(gloss.withDefRef(ref))
    })
  }

  const name = this.title !== '' ? this.title : 'Anonymous'

  this.glosses = GlossList({ name: name, items: refGlosses })
  this.length = this.glosses.length
  this.ref = ref
}

$Glossary.prototype = Object.create(AbstractWork.prototype)

$Glossary.prototype.forEach = function () {
  return this.glosses.forEach(...arguments)
}
$Glossary.prototype.getGloss = function (key) {
  return this.glosses.get(key)
}
$Glossary.prototype.getName = function () {
  return `${this.title} ${this.subtitle}`
}
$Glossary.prototype.getRef = function () {
  return this.ref
}

function Glossary (props) {
  const obj = new $Glossary(...arguments)
  freeze(obj, $Glossary)
  return obj
}

export { Glossary }
