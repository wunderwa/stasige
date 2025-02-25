import { join, parse } from 'node:path'
import { readdirSync } from 'node:fs'
import { distAssetsDir } from './config.js'
import { readFile } from './filesys.js'

export const pugFunc = () => ({
  assets: (p: string) => join('/', distAssetsDir, p),
})

type PugDataValue = { [key: string]: unknown }
type PugData = (p: (file?: string) => string) => PugDataValue
export const pugData: PugData = (pathInData) => {
  const list = readdirSync(pathInData())
  const data: PugDataValue = {}
  for (const fl of list) {
    data[parse(fl).name] = JSON.parse(readFile(pathInData(fl)))
  }
  return data
}
