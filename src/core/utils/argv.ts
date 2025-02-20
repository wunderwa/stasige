import minimist from 'minimist'
import { clean, printHelp } from './index.js'

const minOpts = {
  boolean: ['c', 'h'],
  number: [],
  alias: { c: 'clear', h: 'help' },
}

export type MinArgv<T = {}> = T & {
  clear: boolean
  help: boolean
  _: string[]
}

type Prm = {
  boolean?: string[]
  alias?: {
    [k: string]: string
  }
}

export const getArgv = <T>(prm?: Prm): MinArgv<T> => {
  const { boolean = [], alias = {} } = prm ?? {}

  const opts = {
    boolean: [...boolean, ...minOpts.boolean],
    alias: { ...alias, ...minOpts.alias },
  }

  return minimist<MinArgv<T>>(process.argv.slice(2), opts)
}

export const minActions = <T>(
  cmd: string,
  { clear = false, help = true }: MinArgv<T>,
) => {
  if (clear) {
    clean()
  }
  if (help) {
    printHelp(cmd, { exit: true })
  }
}

export const checkSiteName = (cmd: string, siteName?: string) => {
  if (!siteName) {
    printHelp(cmd, {
      error: 'No site name found. See help below',
      exit: true,
    })
  }
}
