import { taskVars } from './core/task-vars.js'
import { CoreConfig, PageProps } from './core/utils/types.js'
import {
  getArgv,
  getConfig,
  minActions,
  MinArgv,
  parsePageProps,
  printHelp,
  readMono,
} from './core/utils/index.js'

const CMD = 'vars'

const argv: MinArgv = getArgv()
minActions(CMD, argv)

const mono = readMono()

const siteName = mono ? '' : argv._[0]
const argList = mono ? argv._ : argv._.slice(1)

if (!siteName && !mono) {
  printHelp(CMD, {
    exit: true,
    error: 'No site template name argument found. See help below',
  })
}

const coreConfig: CoreConfig = getConfig({ siteName, mono, dev: false })

const params: {
  siteName: string
  page: PageProps
  varList: string[]
} = {
  siteName,
  page: null,
  varList: [],
}

if (argList.length === 1) {
  params.varList = argList[0].split(',') as string[]
} else if (argList.length > 1) {
  params.page = parsePageProps(argList[0])
  params.varList = argList[1].split(',')
}

if (params.page?.langs?.length ?? 0 > 1) {
  console.info('The first language will be used: ', params.page?.langs[0])
}

await taskVars({ coreConfig, ...params })
