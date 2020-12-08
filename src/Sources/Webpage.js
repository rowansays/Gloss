import { freeze } from '@mfields/lib/.internal/freeze.js'
import { AbstractWork } from '../Abstracts/AbstractWork.js'

/**
 * A webpage is a type of source.
 *
 * @param id {Work} An object that identifies this webpage
 * @param home {string} The homepage of this website.
 */
function Webpage () {
  function Webpage (id, home) {
    AbstractWork.call(this, id)
    this.homeUrl = home && typeof home === 'string' ? home.trim() : ''
  }

  Webpage.prototype = Object.create(AbstractWork.prototype)

  Webpage.prototype.getHomeUrl = function () {
    return this.homeUrl
  }

  const webpage = new Webpage(...arguments)
  freeze(webpage, Webpage)
  return webpage
}

export { Webpage }
