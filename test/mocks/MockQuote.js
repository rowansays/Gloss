import { isRef } from '../../src/Utility/predicate.js'
import { MockRef } from './MockRef.js'

export function MockQuote (name, from, ref) {
  ref = isRef(ref) ? ref : new MockRef('default')
  this.name = typeof name === 'string' ? name : 'default'
  this.from = typeof from === 'string' ? from : ''
  this.refs = {
    items: [ref],
    length: 1,
    get: function () {return ref},
    [Symbol.iterator]: () => {
      let step = 0
      return {
        next: () => {
          step++
          switch (step) {
            case 1 : return { value: ref, done: false }
            default : return { value: undefined, done: true }
          }
        }
      }
    }
  }
}

MockQuote.prototype.reduce = function () { return this }
MockQuote.prototype.withRef = function () { return this }
