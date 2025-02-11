import minimist from 'minimist'
import { taskVars } from './core/task-vars.js'
import { CoreConfig, PageProps } from './core/utils/types.js'
import { cleanFormat, getConfig, readConfig } from './core/utils/index.js'



const parsePage = (p: string): PageProps => {
  if (!p) return null
  const param = p.split(':')

  if (!param[0] || !param[0].match('/,/')) {
    return null
  }

  return {
    pathBase: param[0],
    langs: param[1] ? param[1].split(',') : [],
  }
}


// yarn vars -h
// yarn vars -c  <site>
// yarn vars -c default
// yarn vars -c  <site> <list>
// yarn vars -c default title,body,lang
// yarn vars -c  <site> <pathBase:lang,lang> <list>
// yarn vars -c default /docs/icon:ru title,body,lang
const opts = {
  boolean: ['c', 'h'],
  alias: { c: 'clear', h: 'help' },
}

type Argv = {
  clear: boolean
  help: boolean
  _: string[]
}
const argv: Argv = minimist<Argv>(process.argv.slice(2), opts)

if (argv.clear) {
  cleanFormat()
}
if (argv.help) {
  // print help
  process.exit(0)
}

const site = argv._[0]
const page = parsePage(argv._[1])
const varList = argv._[2] ? argv._[2].split(',') : []


const coreConfig: CoreConfig = getConfig({ siteName: site, dev: false })
const { buildConfigPath} = coreConfig
const buildConfig = readConfig(buildConfigPath)

await taskVars({ buildConfig, coreConfig, page, varList })
