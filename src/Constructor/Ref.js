import { AbstractNamed } from '../Abstracts/AbstractNamed.js'

function $Ref (props) {
  AbstractNamed.call(this, props)
  Object.defineProperties(this, {
    type: { enumerable: true, value: 'Ref' }
  })
  Object.freeze(this)
}

$Ref.prototype = Object.create(AbstractNamed.prototype)

Object.defineProperty($Ref.prototype, 'constructor', {
  value: $Ref
})

Object.freeze($Ref.prototype)

export { $Ref }
