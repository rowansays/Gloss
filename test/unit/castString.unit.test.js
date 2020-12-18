import { castString } from '../../src/Utility/cast.js'

describe('castString()', () => {
  test('extracts the "name" value from objects with a getName() method.', () => {
    const namedObject = { getName: () => 'Kublai Khan' }
    expect(castString(namedObject)).toBe('Kublai Khan')
  })
})
