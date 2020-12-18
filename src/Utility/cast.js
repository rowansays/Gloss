import { castString as $castString } from '@rowansays/helpers'
import { castArray } from '@rowansays/helpers'
import { isNamed } from './predicate.js'

export function castString (aught) {
  return isNamed(aught) ? aught.getName() : $castString(aught)
}

export function castStringArray (aught) {
  return castArray(aught, (x) => {
    const string = castString(x)
    return string === '' ? undefined : string
  })
}
