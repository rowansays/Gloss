import { $Def } from '../Constructor/Def.js'
import { $DefList } from '../Constructor/Deflist.js'

export function Def () {
  return new $Def(...arguments)
}

export function DefList () {
  return new $DefList(...arguments)
}
