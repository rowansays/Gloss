export function MockWork (props) {
  props = typeof props === 'object' ? props : {}
  this.author = props.author || ''
  this.date = props.date || ''
  this.description = props.description || ''
  this.key = props.key || ''
  this.subtitle = props.subtitle || ''
  this.title = props.title || ''
  this.url = props.url || ''
}

MockWork.prototype.getAuthor = function () { return this.author }
MockWork.prototype.getDate = function () { return this.date }
MockWork.prototype.getDescription = function () { return this.description }
MockWork.prototype.getKey = function () { return this.key }
MockWork.prototype.getName = function () { return this.title }
MockWork.prototype.getSubtitle = function () { return this.subtitle }
MockWork.prototype.getTitle = function () { return this.title }
MockWork.prototype.getUrl = function () { return this.url }
