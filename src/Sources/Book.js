import { freeze } from '@mfields/lib/.internal/freeze.js'
import { AbstractWork } from '../Abstracts/AbstractWork.js'

/**
 * A Book is a type of Source.
 */
function Book (key, title, subtitle, description, author, date, url) {
  AbstractWork.call(this, key, title, subtitle, description)
  this.author = author && typeof author === 'string' ? author : ''
  this.date = cleanDateString(date)
  this.url = url && typeof url === 'string' ? url : ''
}

Book.prototype = Object.create(AbstractWork.prototype)

Book.prototype.getUrl = function () {
  return this.url
}

function cleanDateString (dirty) {
  switch (typeof dirty) {
    case 'string': return dirty
    case 'number': return String(dirty)
    default: return ''
  }
}

function Factory () {
  const book = new Book(...arguments)
  freeze(book, Book)
  return book
}

export { Factory as Book }
