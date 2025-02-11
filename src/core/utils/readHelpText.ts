import { readFile } from './filesys.js'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

export const readHelpText = (name: string): string => {
  const fPath = join(process.cwd(), 'src', 'help', `yarn-${name}.txt`)

  if(existsSync(fPath)) {
    const text = readFile(`src/help/yarn-${name}.txt`)
    const list = text.split('\n')
    list[0] = `\x1b[7m ${list[0]} \x1b[0m`
    return list.join("\n")
  } else {
    return 'Wrong file path'
  }


}
