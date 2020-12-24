import { $Def } from '../Constructor/Def.js'
import { $DefList } from '../Constructor/Deflist.js'
import { $GlossList } from '../Constructor/GlossList.js'

export function Def () {
  return new $Def(...arguments)
}

export function DefList () {
  return new $DefList(...arguments)
}

export function GlossList () {
  return new $GlossList(...arguments)
}
