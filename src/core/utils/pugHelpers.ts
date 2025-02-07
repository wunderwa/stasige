import { join } from 'node:path'
import { distAssetsDir } from './config.js'

export const pugFunc = () => ({
  assets: (p: string) => join('/', distAssetsDir, p),
})

type PugData = () => {
  [key: string]: unknown
}
export const pugData: PugData = () => {
  return {}
}
