function AbstractWork (key, title, subtitle, description) {
  this.key = key && typeof key === 'string' ? key.trim() : ''
  this.subtitle = subtitle && typeof subtitle === 'string' ? subtitle.trim() : ''
  this.title = title && typeof title === 'string' ? title.trim() : ''
  this.description = description && typeof description === 'string' ? description.trim() : ''
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

export { AbstractWork }
