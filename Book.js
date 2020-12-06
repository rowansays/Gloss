import { freeze } from '@mfields/lib/.internal/freeze.js'
import { makeInstanceOf } from '@mfields/lib/makeInstanceOf.js'

/**
 * A Book is a type of Source.
 */

function Book (key, title, subtitle, author, date, url) {
  if (!(this instanceof Book)) {
    return makeInstanceOf(Book, arguments)
  }

  this.author = author && typeof author === 'string' ? author : ''
  this.date = cleanDateString(date)
  this.key = key && typeof key === 'string' ? key : ''
  this.subtitle = subtitle && typeof subtitle === 'string' ? subtitle : ''
  this.title = title && typeof title === 'string' ? title : ''
  this.url = url && typeof url === 'string' ? url : ''

  freeze(this, Book)
}
Book.prototype.getType = function (type) {
  return 'Book'
}
Book.prototype.getName = function (type) {
  type = type === 'long' ? 'long' : 'short'
  return type === 'short'
    ? this.title
    : this.title + ' ' + this.subtitle
}

Book.prototype.getUrl = function () {
  return this.url
}

Book.fromObject = function (o) {
  return new Book(
    o && o.key ? o.key : '',
    o && o.title ? o.title : '',
    o && o.subtitle ? o.subtitle : '',
    o && o.author ? o.author : '',
    o && o.date ? o.date : '',
    o && o.url ? o.url : ''
  )
}

function cleanDateString (dirty) {
  if (typeof dirty === 'string') {
    return dirty
  }
  if (typeof dirty === 'number') {
    return String(dirty)
  }
  return ''
}

export { Book }
