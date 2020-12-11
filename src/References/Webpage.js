/**
 * A webpage is a work which is also a type of reference.
 *
 * @param id {Work} An object that identifies this webpage
 * @param home {string} The homepage of this website.
 */

import { AbstractWork } from '../Abstracts/AbstractWork.js'
import { freeze } from '../Utility/freeze.js'

function $Webpage (id, home) {
  AbstractWork.call(this, id)
  this.homeUrl = home && typeof home === 'string' ? home.trim() : ''
}

$Webpage.prototype = Object.create(AbstractWork.prototype)

Object.defineProperty($Webpage.prototype, 'constructor', {
  value: $Webpage
})

$Webpage.prototype.getHomeUrl = function () {
  return this.homeUrl
}

function Webpage () {
  const obj = new $Webpage(...arguments)
  freeze(obj, $Webpage)
  return obj
}

export { Webpage }
