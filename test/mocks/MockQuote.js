export function MockQuote (name, from, ref) {
  this.name = name
  this.from = from
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
