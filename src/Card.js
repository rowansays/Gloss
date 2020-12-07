import { freeze } from '@mfields/lib/.internal/freeze.js'
import { AbstractWork } from '../Abstracts/AbstractWork.js'

/**
 * A Card is a concrete representation of an abstract work.
 */
function Card () {
  AbstractWork.call(this, ...arguments)
}

Card.prototype = Object.create(AbstractWork.prototype)

Card.prototype.getUrl = function () {
  return this.url
}

function Factory () {
  const card = new Card(...arguments)
  freeze(card, Card)
  return card
}

export { Factory as Card }
