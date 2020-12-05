import { freeze } from '@mfields/lib/.internal/freeze.js'
import { makeInstanceOf } from '@mfields/lib/makeInstanceOf.js'

function Dictionary (name, desc, entries) {
  if (!(this instanceof Dictionary)) {
    return makeInstanceOf(Dictionary, arguments)
  }

  this.name = name && typeof name === 'string' ? name : ''
  this.description = desc && typeof desc === 'string' ? desc : ''
  this.entries = []

  freeze(this, Dictionary)
}

export { Dictionary }
