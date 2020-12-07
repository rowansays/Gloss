import { isWork } from '../Predicates/isWork.js'

function AbstractWork (key, title, subtitle, description, author, date, url) {
  console.log(typeof arguments[0])
  if (arguments.length === 1 && isWork(arguments[0])) {
    const work = arguments[0]
    this.author = work.getAuthor()
    this.date = work.getDate()
    this.description = work.getDescription()
    this.key = work.getKey()
    this.subtitle = work.getSubtitle()
    this.title = work.getTitle()
    this.url = work.getUrl()
  } else {
    this.author = author && typeof author === 'string' ? author.trim() : ''
    this.date = cleanDateString(date)
    this.description = description && typeof description === 'string' ? description.trim() : ''
    this.key = key && typeof key === 'string' ? key.trim() : ''
    this.subtitle = subtitle && typeof subtitle === 'string' ? subtitle.trim() : ''
    this.title = title && typeof title === 'string' ? title.trim() : ''
    this.url = url && typeof url === 'string' ? url.trim() : ''
  }
}
AbstractWork.prototype.getAuthor = function () {
  return this.author
}
AbstractWork.prototype.getDate = function () {
  return this.date
}
AbstractWork.prototype.getDescription = function () {
  return this.description
}
AbstractWork.prototype.getKey = function () {
  return this.key
}
AbstractWork.prototype.getName = function (type) {
  type = type === 'long' ? 'long' : 'short'
  return type === 'short'
    ? this.title
    : this.title + ' ' + this.subtitle
}
AbstractWork.prototype.getSubtitle = function () {
  return this.subtitle
}
AbstractWork.prototype.getTitle = function () {
  return this.title
}
AbstractWork.prototype.getUrl = function () {
  return this.url
}

function cleanDateString (dirty) {
  switch (typeof dirty) {
    case 'string': return dirty
    case 'number': return String(dirty)
    default: return ''
  }
}

export { AbstractWork }
