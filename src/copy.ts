import { existsSync, cpSync } from 'node:fs'
import {
  exec,
  minActions,
  getArgv,
  MinArgv,
  checkSiteName,
  printHelp,
  initReadLine,
} from './core/utils/index.js'
import { join } from 'node:path'
const CMD = 'copy'

const argv: MinArgv = getArgv()
minActions(CMD, argv)

const siteName = argv._[0]

checkSiteName(CMD, siteName)

if (existsSync(join('sites', siteName))) {
  printHelp(CMD, {
    error: `Directory '${siteName}' already exists. Enter other site template name`,
    exit: true,
  })
}

const read = initReadLine()
const answer = await read.question(
  `Print 'y' to create '${siteName}' site template from default: `,
)

if (answer.toLowerCase() === 'y') {
  const path = `sites/${siteName}`

  cpSync('sites/default', path, { recursive: true })

  const { stdout, stderr } = await exec(`cd ${path} && git init`)
  if (stdout) {
    console.info(stdout)
  } else if (stderr) {
    printHelp(CMD, {
      error: stderr,
    })
  }
}

read.close()
