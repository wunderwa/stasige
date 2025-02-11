import { join, parse } from 'node:path'
import { readdirSync } from 'node:fs'
import set from 'lodash/set.js'
import { distAssetsDir } from './config.js'
import { readFile } from './filesys.js'

export const pugFunc = () => ({
  assets: (p: string) => join('/', distAssetsDir, p),
})

type PugData = (p: (file?: string) => string) => {
  [key: string]: unknown
}
export const pugData: PugData = (pathInData) => {
  const list = readdirSync(pathInData())
  const data = {}
  for (const fl of list) {
    set(data, parse(fl).name, JSON.parse(readFile(pathInData(fl))))
  }
  return data
}
