import { freeze } from '@mfields/lib/.internal/freeze.js'
import { makeInstanceOf } from '@mfields/lib/makeInstanceOf.js'

/**
 * A Webpage is a type of Source.
 */
function Webpage (key, title, author, url) {
  if (!(this instanceof Webpage)) {
    return makeInstanceOf(Webpage, arguments)
  }

  this.author = author && typeof author === 'string' ? author : ''
  this.key = key && typeof key === 'string' ? key : ''
  this.title = title && typeof title === 'string' ? title : ''
  this.url = url && typeof url === 'string' ? url : ''

  freeze(this, Webpage)
}
Webpage.prototype.getName = function () {
  return this.title
}
Webpage.prototype.getUrl = function () {
  return this.url
}

export { Webpage }
