import { castString as $castString, castArray } from '@rowansays/helpers'

import { isNamed } from './predicate.js'

export function castString (aught) {
  return isNamed(aught) ? aught.name : $castString(aught)
}

export function castStringArray (aught) {
  return castArray(aught, (x) => {
    const string = castString(x)
    return string === '' ? undefined : string
  })
}
