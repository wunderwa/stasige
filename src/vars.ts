import { taskVars } from './core/task-vars.js'
import { CoreConfig, PageProps } from './core/utils/types.js'
import {
  getArgv,
  getConfig,
  minActions,
  MinArgv,
  parsePageProps,
  printHelp,
} from './core/utils/index.js'

const CMD = 'vars'

const argv: MinArgv = getArgv()
minActions(CMD, argv)

const siteName = argv._[0]

if (!siteName) {
  printHelp(CMD, {
    exit: true,
    error: 'No site template name argument found. See help below',
  })
}

const coreConfig: CoreConfig = getConfig({ siteName, dev: false })

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

await taskVars({ coreConfig, ...params })
