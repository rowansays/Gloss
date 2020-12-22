import { isRef } from '../../src/Utility/predicate.js'
import { MockRef } from './MockRef.js'

export function MockQuote (name, cite, ref) {
  ref = isRef(ref) ? ref : new MockRef('default')
  this.name = typeof name === 'string' ? name : 'default'
  this.cite = typeof cite === 'string' ? cite : ''
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

MockQuote.prototype.from = function () { return this }
MockQuote.prototype.reduce = function () { return this }
