import { readFile, readMono } from './filesys.js'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { InfoFormat } from './console.js'
import { green, yellow } from './colored.js'

export type HelpLine = string | [InfoFormat, string]

const getFileName = (name: string, mono: boolean): string | null => {
  const root = process.cwd()
  const fName = mono ? `${name}-mono` : `${name}`
  const relativePath = join('docs', 'help-txt', `${fName}.txt`)

  const locPath = join(root, relativePath)
  if (existsSync(locPath)) {
    return locPath
  }
  const nodePath = join(root, 'node_modules', 'stasige', relativePath)
  if (existsSync(nodePath)) {
    return nodePath
  }
  return null
}

export const helpTextLines = (name: string): HelpLine[] => {
  const mono = readMono()
  const fPath = getFileName(name, mono)

  if (!fPath) {
    return [['error', `Wrong help file path: ${fPath} `]]
  }
  const text = readFile(fPath)
  const list = text.split('\n')
  const mode = mono ? green('mono') : yellow('multi')
  list[0] = `\x1b[7m > Stasige: ssg \x1b[0m \x1b[1m yarn ${name} (${mode}) \x1b[0m`

  return list
}
