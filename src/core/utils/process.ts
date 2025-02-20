import { promisify } from 'node:util'
import child_process from 'node:child_process'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

export const exec = promisify(child_process.exec)

export const getReadLine = () => readline.createInterface({ input, output })
