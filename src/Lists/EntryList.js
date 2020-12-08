import { freeze } from '@mfields/lib/.internal/freeze.js'
import { AbstractObjectList } from '../Abstracts/AbstractObjectList.js'
import { isEntry } from '../Predicates/isEntry.js'

function $EntryList (...entries) {
  AbstractObjectList.call(this)
  this.items = []
  if (!!entries && typeof entries.forEach === 'function') {
    entries.forEach(entry => {
      if (isEntry(entry)) {
        this.items.push(entry)
      }
    })
  }
}

$EntryList.prototype = Object.create(AbstractObjectList.prototype)

Object.defineProperty($EntryList.prototype, 'constructor', {
  value: $EntryList
})

function EntryList () {
  const list = new $EntryList(...arguments)
  freeze(list, $EntryList)
  return list
}

export { EntryList }
