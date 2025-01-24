import { existsSync, promises, readFileSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'

import { BuildConfig } from './types.js'

export const cleanDir = (path: string): void => {
  if (existsSync(path)) {
    rmSync(path, { recursive: true })
  }
}

export const readDir = async (path: string): Promise<string[]> => {
  return await promises.readdir(path, { recursive: true })
}

export const readFile = (path: string): string => readFileSync(path, 'utf8')

export const readConfig = (path: string): BuildConfig =>
  JSON.parse(readFile(path)) as BuildConfig

export const joinPath = (dirs: string[], file: string): string =>
  join(...dirs, file)

export const writeFile = async (
  path: string,
  content: string,
): Promise<void> => {
  const dir = dirname(path)
  if (!existsSync(dir)) {
    await promises.mkdir(dir, { recursive: true })
  }
  await promises.writeFile(path, content)
}
