import { isWork } from '../Predicates/isWork.js'

function AbstractWork (key, title, subtitle, description, author, date, url) {
  let props = {}
  if (arguments.length === 1 && typeof arguments[0] === 'object') {
    const work = arguments[0]
    if (isWork(arguments[0])) {
      props = {
        author: work.getAuthor(),
        date: work.getDate(),
        description: work.getDescription(),
        key: work.getKey(),
        subtitle: work.getSubtitle(),
        title: work.getTitle(),
        url: work.getUrl()
      }
    } else {
      props = work
    }
  } else {
    props = { author, date, description, key, subtitle, title, url }
  }

  assignProperties(this, props)
}

function assignProperties (obj, props) {
  if (typeof obj !== 'object' || typeof props !== 'object') {
    return
  }
  const { author, date, description, key, subtitle, title, url } = props
  obj.author = author && typeof author === 'string' ? author.trim() : ''
  obj.date = cleanDateString(date)
  obj.description = description && typeof description === 'string' ? description.trim() : ''
  obj.key = key && typeof key === 'string' ? key.trim() : ''
  obj.subtitle = subtitle && typeof subtitle === 'string' ? subtitle.trim() : ''
  obj.title = title && typeof title === 'string' ? title.trim() : ''
  obj.url = url && typeof url === 'string' ? url.trim() : ''
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
