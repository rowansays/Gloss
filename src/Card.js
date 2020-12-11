/**
 * A card is a work.
 */

import { freeze } from './Utility/freeze.js'
import { AbstractWork } from './Abstracts/AbstractWork.js'

function $Card () {
  AbstractWork.call(this, ...arguments)
}

$Card.prototype = Object.create(AbstractWork.prototype)

Object.defineProperty($Card.prototype, 'constructor', {
  value: $Card
})

function Card () {
  const obj = new $Card(...arguments)
  freeze(obj, $Card)
  return obj
}

export { Card }
