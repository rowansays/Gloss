import { isReference } from '../../src/Utility/isReference.js'

export function MockQuote (name, ...refs) {
  this.name = name
  this.refs = []
  refs.forEach(ref => {
    if (isReference(ref)) {
      this.refs.push(ref)
    }
  })
  this.length = 1
  this.mentions = this.refs.length
}

MockQuote.prototype.forEach = function () {}
MockQuote.prototype.getAltNames = function () { return [] }
MockQuote.prototype.getName = function () { return this.name }
MockQuote.prototype.getProps = function () { return { ...this } }
MockQuote.prototype.isSingular = function () { return true }
MockQuote.prototype.slice = function () { return this }
MockQuote.prototype.withQuote = function () { return this }
MockQuote.prototype.withRef = function () { return this }
