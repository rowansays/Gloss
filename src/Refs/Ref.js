import { AbstractRef } from './AbstractRef.js'
import { castString } from '../Utility/cast.js'
import { validateStringProp } from '../Utility/validate.js'

function $Ref (...props) {
  AbstractRef.call(this, ...props)
  Object.defineProperties(this, {
    type: { enumerable: true, value: 'Ref' }
  })
  Object.freeze(this)
}

$Ref.parseRef = (ref) => {
  const o = Object.create(null)
  o.desc = castString(ref.desc)
  o.name = validateStringProp('AbstractRef', 'ref.name', ref.name)
  o.url = castString(ref.url)
  return o
}

$Ref.prototype = Object.create(AbstractRef.prototype)

Object.defineProperty($Ref.prototype, 'constructor', {
  value: $Ref
})

function Ref () {
  return new $Ref(...arguments)
}

export { Ref }
