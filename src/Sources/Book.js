import { freeze } from '@mfields/lib/.internal/freeze.js'
import { AbstractWork } from '../Abstracts/AbstractWork.js'

/**
 * A book is a type of source.
 *
 * @param id {Work} An object that identifies this book.
 * @param home {string} The publisher of this book.
 */
function Book (id, publisher) {
  function Book (id, publisher) {
    AbstractWork.call(this, id)
    this.publisher = publisher && typeof publisher === 'string' ? publisher.trim() : ''
  }

  Book.prototype = Object.create(AbstractWork.prototype)

  Book.prototype.getPublisher = function () {
    return this.publisher
  }

  const book = new Book(...arguments)
  freeze(book, Book)
  return book
}

export { Book }
