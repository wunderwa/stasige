import minimist from 'minimist'
import { taskVars } from './core/task-vars.js'
import { BuildConfig, CoreConfig, PageProps } from './core/utils/types.js'
import {
  clean,
  getConfig,
  parsePageProps,
  printHelp,
  readConfig,
} from './core/utils/index.js'

const CMD = 'vars'

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
  clean()
}
if (argv.help) {
  printHelp(CMD, { exit: true })
}

const siteName = argv._[0]

if (!siteName) {
  printHelp(CMD, {
    exit: true,
    error: 'No site template name argument found. See help below',
  })
}

const coreConfig: CoreConfig = getConfig({ siteName, dev: false })
const { buildConfigPath } = coreConfig

let buildConfig: BuildConfig

buildConfig = readConfig(buildConfigPath) as BuildConfig

const params: {
  siteName: string
  page: PageProps
  varList: string[]
} = {
  siteName,
  page: null,
  varList: [],
}

if (argv._.length === 2) {
  params.varList = argv._[1].split(',') as string[]
} else if (argv._.length > 2) {
  params.page = parsePageProps(argv._[1])
  params.varList = argv._[2].split(',')
}

if (params.page?.langs?.length ?? 0 > 1) {
  console.info('The first language will be used: ', params.page?.langs[0])
}

await taskVars({ buildConfig, coreConfig, ...params })
