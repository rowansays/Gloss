import { AbstractWork } from '../Abstracts/AbstractWork.js'
import { freeze } from '@mfields/lib/.internal/freeze.js'
import { GlossList } from '../Lists/GlossList.js'

/**
 * Glossary constructor.
 *
 * A glossary is a work that contains a list of entries from a single reference.
 *
 * @param {Work} The identity of this glossary.
 * @param {string} referenceKey The key of the {Reference} from which all
 *   glosses originate.
 * @param {Gloss} ...glosses  Zero or more glosses.
 */
function $Glossary (id, referenceKey, ...glosses) {
  AbstractWork.call(this, id)
  this.glosses = GlossList(...glosses)
  this.referenceKey = typeof referenceKey === 'string' ? referenceKey : ''
}

$Glossary.prototype = Object.create(AbstractWork.prototype)

$Glossary.prototype.forEach = function () {
  return this.glosses.forEach(...arguments)
}

$Glossary.prototype.getSize = function () {
  return this.glosses.getSize()
}

function Glossary () {
  const obj = new $Glossary(...arguments)
  freeze(obj, $Glossary)
  return obj
}

export { Glossary }
