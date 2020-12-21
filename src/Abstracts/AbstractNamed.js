import { castString } from '../Utility/cast.js'

/**
 * Abstract Named Object constructor.
 *
 * @param {object} props Required.
 * @prop {string} name
 * @throws TypeError
 */
function AbstractNamed (props) {
  const clean = props ? castString(props.name) : ''
  if (clean === '') {
    throw new TypeError('' +
      `${this.constructor.name}() - The "props" parameter must possess a ` +
      '"name" property whose value is either a string or a number. ' +
      `A value with type "${typeof aught}" was provided.`
    )
  }

  this.name = clean
}

export { AbstractNamed }
