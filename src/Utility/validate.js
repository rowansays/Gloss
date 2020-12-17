import { castString } from './castString.js'
import { isReference } from './predicate.js'

/**
 * Validate reference when passed as a property.
 *
 * @param {string} funcName The name of the function that accepts the parameter.
 * @param {string} funcName The name of the parameter.
 * @param {*} aught The value to validate.
 *
 * @return {Reference}
 * @throws {TypeError}
 */
export function validateRefProp (funcName, paramName, aught) {
  if (!isReference(aught)) {
    throw new TypeError('' +
      `${funcName}() - the ${paramName} parameter must contain a single ` +
      `reference object. A value with a type of "${typeof aught}" was ` +
      `provided. Here is its string value: "${aught}".`
    )
  }
  return aught
}
/**
 * Validate non-empty string when passed as a property.
 *
 * @param {string} funcName The name of the function that accepts the parameter.
 * @param {string} funcName The name of the parameter.
 * @param {*} aught The value to validate.
 *
 * @return {string}
 * @throws {TypeError}
 */
export function validateStringProp (funcName, paramName, aught) {
  const clean = castString(aught)
  if (clean === '') {
    throw new TypeError('' +
      `${funcName}(): the "${paramName}" parameter must be a non-empty ` +
      `string. A value with a type of "${typeof aught}" was provided.`
    )
  }
  return clean
}
