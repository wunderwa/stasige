import {
  existsSync,
  lstatSync,
  promises,
  readFileSync,
  rmSync,
  unlinkSync,
  readdirSync,
} from 'node:fs'
import { dirname, join } from 'node:path'

import { criticalError } from './console.js'

export const cleanDir = async (filePath: string): Promise<void> => {
  if (existsSync(filePath)) {
    readdirSync(filePath).forEach((name) => {
      const fPath = join(filePath, name)
      const stat = lstatSync(fPath)
      if (stat.isDirectory()) {
        rmSync(fPath, { recursive: true })
      } else {
        unlinkSync(fPath)
      }
    })
  }
}

export const readDir = async (dirPath: string): Promise<string[]> => {
  return await promises.readdir(dirPath, { recursive: true })
}

export const readFile = (filePath: string): string =>
  readFileSync(filePath, 'utf8')

export const readConfig = <T>(filePath: string): T | null => {
  try {
    return JSON.parse(readFile(filePath)) as T
  } catch (e) {
    criticalError(`Could not read config file.\n ${filePath}`)
    return null
  }
}

export const readMono = (): boolean =>
  readConfig<{ mono?: boolean }>('package.json')?.mono ?? false

export const joinPath = (dirs: string[], file: string): string =>
  join(...dirs, file)

export const writeFile = async (
  filePath: string,
  content: string,
): Promise<void> => {
  const dirPath = dirname(filePath)
  if (!existsSync(dirPath)) {
    await promises.mkdir(dirPath, { recursive: true })
  }
  await promises.writeFile(filePath, content)
}
