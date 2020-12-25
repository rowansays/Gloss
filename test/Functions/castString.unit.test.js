import { castString } from '../../src/Utility/cast.js'

describe('castString()', () => {
  test('extracts the "name" value from objects with a name property.', () => {
    const namedObject = { name: 'Kublai Khan' }
    expect(castString(namedObject)).toBe('Kublai Khan')
  })
})
