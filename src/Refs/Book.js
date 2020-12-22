import { AbstractNamed } from '../Abstracts/AbstractNamed.js'
import { castString } from '../Utility/cast.js'

function $Book (props) {
  AbstractNamed.call(this, { name: props.title })

  Object.defineProperties(this, {
    type: { enumerable: true, value: 'RefBook' },
    author: { enumerable: true, value: castString(props.author) },
    datePublished: { enumerable: true, value: castString(props.datePublished) },
    desc: { enumerable: true, value: castString(props.desc) },
    subtitle: { enumerable: true, value: castString(props.subtitle) },
    title: { enumerable: true, value: this.name },
    url: { enumerable: true, value: castString(props.url) }
  })
  Object.freeze(this)
}

$Book.prototype = Object.create(AbstractNamed.prototype)

Object.defineProperty($Book.prototype, 'constructor', {
  value: $Book
})

function Book (...refs) {
  return new $Book(...refs)
}

export { $Book, Book }
