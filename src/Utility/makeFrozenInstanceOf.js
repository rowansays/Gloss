import { freeze } from './freeze.js'
import { makeInstanceOf } from './makeInstanceOf.js'

/**
 * Create an instance of a given constructor.
 *
 * @param {function} constructor The function which will be used to create
 *   the object.
 * @param {object} args An array-like object that contains iterable properties.
 *   These properties will be passed as arguments to the constructor function.
 *
 * @return object
 */
export function makeFrozenInstanceOf (constructor, args) {
  const instance = makeInstanceOf(constructor, args)
  freeze(instance)
  return instance
}
