import {
  DIST_DEV,
  DIST_PROD,
  checkSiteName,
  getArgv,
  minActions,
  MinArgv,
  printHelp,
  startServer,
} from './core/utils/index.js'
import { join } from 'node:path'
import { existsSync } from 'node:fs'

const CMD = 'srv'

type Extend = {
  dev: boolean
  port: string
}

const extend = {
  boolean: ['D'],
  number: ['p'],
  alias: { D: 'dev', p: 'port' },
}

const argv: MinArgv<Extend> = getArgv<Extend>(extend)

minActions(CMD, argv)

const siteName = argv._[0]

checkSiteName(CMD, siteName)

const buildDir = argv.dev ? join(DIST_DEV, siteName) : join(DIST_PROD, siteName)

if (!existsSync(buildDir)) {
  printHelp(CMD, {
    error: `Directory '${buildDir}' does not exist.`,
    exit: true,
  })
}

const port = Number.isInteger(parseInt(argv.port)) ? parseInt(argv.port) : 8000

startServer({
  port,
  root: buildDir,
})
