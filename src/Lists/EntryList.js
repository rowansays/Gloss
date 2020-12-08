import { freeze } from '@mfields/lib/.internal/freeze.js'
import { AbstractObjectList } from '../Abstracts/AbstractObjectList.js'
import { isEntry } from '../Predicates/isEntry.js'

function EntryList (...entries) {
  AbstractObjectList.call(this, ...arguments)
  this.items = []
  entries.forEach(entry => {
    if (isEntry(entry)) {
      this.items.push(entry)
    } else {
      console.log('NOT isEntry()', entry)
    }
  })
}

EntryList.prototype = Object.create(AbstractObjectList.prototype)
Object.defineProperty(EntryList.prototype, 'constructor', {
  value: EntryList,
  enumerable: false,
  writable: false
})

function Factory () {
  const list = new EntryList(...arguments)
  freeze(list, EntryList)
  return list
}

export { Factory as EntryList }
