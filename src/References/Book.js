/**
 * A book is a work which is also a type of reference.
 *
 * @param id {Work} An object that identifies this book.
 * @param publisher {string} The publisher of this book.
 */

import { AbstractWork } from '../Abstracts/AbstractWork.js'
import { freeze } from '../Utility/freeze.js'

function $Book (id, publisher) {
  AbstractWork.call(this, id)
  this.publisher = publisher && typeof publisher === 'string' ? publisher.trim() : ''
}

$Book.prototype = Object.create(AbstractWork.prototype)

Object.defineProperty($Book.prototype, 'constructor', {
  value: $Book
})

$Book.prototype.getPublisher = function () {
  return this.publisher
}

function Book () {
  const obj = new $Book(...arguments)
  freeze(obj, $Book)
  return obj
}

export { Book }
