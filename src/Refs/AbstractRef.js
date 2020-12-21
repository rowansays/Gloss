import { isRef } from '../Utility/predicate.js'

function AbstractRef (...props) {
  if (props.length < 1) {
    throw new Error('$Ref() - No parameters were passed to the constructor.')
  }

  const refs = []
  props.forEach((ref, i) => {
    let newRef
    if (i === 0) {
      if (typeof this.constructor.parseRef !== 'function') {
        throw new TypeError('' +
          `The constructor ${this.constructor.name}() must provide a static ` +
          'method named parseRef() that validates and sanitizes incoming Ref ' +
          'data. No such method was found by AbstractRef().'
        )
      }
      newRef = this.constructor.parseRef(ref, 1)
    } else if (isRef(ref)) {
      newRef = ref
    } else {
      throw new TypeError('Non reference was passed to AbstractRef().')
    }

    refs.push(newRef)
  })

  Object.defineProperties(this, {
    desc: { enumerable: true, value: refs[0].desc },
    length: { enumerable: true, value: refs.length },
    name: { enumerable: true, value: refs[0].name },
    refs: { value: refs },
    url: { enumerable: true, value: refs[0].url }
  })
}

AbstractRef.prototype = Object.create(null)

export { AbstractRef }
