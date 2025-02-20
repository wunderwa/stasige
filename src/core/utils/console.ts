import colorJson from 'color-json'
import { HelpLine, helpTextLines } from './helpTextLines.js'
export type InfoFormat = 'title' | 'name' | 'json' | 'error'

export const info = (
  format: InfoFormat,
  ...data: (string | Object)[]
): void => {
  data.forEach((item) => {
    if (format === 'title') {
      console.info('\n', `\x1b[7m ${item.toString()} \x1b[0m`, '\n')
    } else if (format === 'error') {
      console.info('\n', `\x1b[41m\x1b[37m  ${item.toString()}  \x1b[0m`, '\n')
    } else if (format === 'name') {
      console.info('\n', `\x1b[7m\x1b[32m ${item.toString()} \x1b[0m`, '\n')
    } else if (format === 'json') {
      if (typeof item === 'string') {
        console.info(`\x1b[0m\x1b[32m"${item}"\x1b[0m`)
      } else {
        console.info(colorJson(item))
      }
    }
  })
}

type Opts = {
  error?: string
  exit?: boolean
}

const printHelpLine = (line: HelpLine) => {
  if (typeof line === 'string') {
    console.info(line)
  } else {
    info(...line)
  }
}

export const criticalError = (error: string) => {
  info('error', error)
  process.exit(0)
}

export const printHelp = (
  name: string,
  { exit = false, error = '' }: Opts = {},
) => {
  if (error) {
    info('error', error)
    console.info(`See help:\n yarn ${name} -hc`)
  } else {
    helpTextLines(name).forEach(printHelpLine)
  }
  if (exit) {
    process.exit(0)
  }
}

export const clean = (isSoft = false) => {
  process.stdout.write(isSoft ? '\x1B[H\x1B[2J' : '\x1B[2J\x1B[3J\x1B[H\x1Bc')
}

export const clearLastLine = () => {
  process.stdout.moveCursor(0, -1) // up one line
  process.stdout.clearLine(1) // from cursor to end
}
