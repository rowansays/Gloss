import { $Def } from '../../src/Defs/Def.js'
import { $Quote } from '../../src/Quotes/Quote.js'
import { $Ref } from '../../src/Refs/Ref.js'

describe('$Def.prototype.from', () => {
  it('  - returns a clone with 1 ref prepended to 1 quote', function () {
    const ref1 = new $Ref({ name: 'Johnny Cash' })
    const ref2 = new $Ref({ name: 'Nick Cave' })
    const quote = new $Quote({ name: 'and the mercy seat is waiting', ref: ref1 })
    const a = new $Def(quote)
    const b = a.from(ref2)
    expect(a === b).toBe(false)
    expect(a.quote(0).ref(0)).toBe(ref1)
    expect(a.quote(0).ref(1)).toBe(undefined)
    expect(b.quote(0).ref(0)).toBe(ref2)
    expect(b.quote(0).ref(1)).toBe(ref1)
  })
  it('  - returns a clone with 1 ref prepended to 3 quotes', function () {
    const r1 = new $Ref({ name: 'Return to Cookie Mountain' })
    const r2 = new $Ref({ name: 'TV on the Radio' })
    const q1 = new $Quote({ name: 'Wolf Like Me', ref: r1 })
    const q2 = new $Quote({ name: 'Wolf Like Me', ref: r1 })
    const q3 = new $Quote({ name: 'Wolf Like Me', ref: r1 })
    const d1 = new $Def(q1, q2, q3)
    const d2 = d1.from(r2)
    expect(d2 === d1).toBe(false)
    expect(d2.quote(0).ref(0)).toBe(r2)
    expect(d2.quote(0).ref(1)).toBe(r1)
    expect(d2.quote(1).ref(0)).toBe(r2)
    expect(d2.quote(1).ref(1)).toBe(r1)
    expect(d2.quote(2).ref(0)).toBe(r2)
    expect(d2.quote(2).ref(1)).toBe(r1)
  })
})