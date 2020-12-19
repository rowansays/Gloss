import { AbstractRef } from './AbstractRef.js'
import { castString } from '../Utility/cast.js'

function $Book (...props) {
  AbstractRef.call(this, ...props)
  Object.defineProperties(this, {
    author: { enumerable: true, value: this.refs[0].author },
    datePublished: { enumerable: true, value: this.refs[0].datePublished },
    subtitle: { enumerable: true, value: this.refs[0].subtitle },
    title: { enumerable: true, value: this.refs[0].title },
    type: { enumerable: true, value: 'RefBook' },
  })
  Object.freeze(this)
}

$Book.parseRef = (ref, i) => {
  const title = castString(ref.title)
  if (title === '') {
    throw new TypeError('' +
      `$Book() title property coerces to an empty string in parameter ${i}.`
    )
  }

  const subtitle = castString(ref.subtitle)
  name = subtitle !== ''
    ? title + ' ' + subtitle
    : title

  const o = Object.create(null)
  o.title = title,
  o.subtitle = subtitle,
  o.author = castString(ref.author),
  o.datePublished = castString(ref.datePublished),

  // From abstract
  o.name = name,
  o.desc = castString(ref.desc),
  o.url = castString(ref.url)

  return o
}

$Book.prototype = Object.create(AbstractRef.prototype)

Object.defineProperty($Book.prototype, 'constructor', {
  value: $Book
})

export function Book (...refs) {
  return new $Book(...refs)
}
