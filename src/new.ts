import minimist from 'minimist'
import { CoreConfig } from './core/utils/types.js'
import { cleanFormat, getConfig, readConfig, readHelpText, writeFile } from './core/utils/index.js'
import {
  checkParents,
  genUpdateList,
  getDefaultContent,
  parseLangs,
} from './worker/index.js'

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

const siteName = argv._[0] ?? 'default'

const page = argv._[1]?.split(':')

if(argv.clear) {
  cleanFormat()
}

if (!page?.[0]) {

  console.error('No page params found')

  console.info(readHelpText('new'))
  process.exit(0)
}

const coreConfig: CoreConfig = getConfig({ siteName, dev: true })
const { buildConfigPath, pathInPages } = coreConfig
const { langs } = readConfig(buildConfigPath)

const main = {
  pathBase: page[0],
  langs: parseLangs(langs, page[1]),
}

const updateList = genUpdateList({
  ...main,
  pathInPages,
})

for (const { lang, pathBase, filePath } of updateList) {
  const content = getDefaultContent(pathBase, lang)
  await writeFile(filePath, content)
}

if (updateList.length) {
  console.log(
    '\nUpdate List:\n',
    updateList.map(({ pathBase, lang }) => ` - ${lang} ${pathBase}`).join('\n'),
  )
}

const parents = checkParents({
  ...main,
  pathInPages,
}).reduce(
  (acc: string[], { pathBase, lang }) => [
    ...acc,
    `  ./wrk -a ${siteName} ${pathBase}:${lang}`,
  ],
  [],
)

if (parents.length) {
  console.info(
    '\nMissing some parents pages. New pages will not included in mainMenu.',
  )
  console.info('Run command to create parent pages:\n')
  console.info(parents.join(' && '))
}

if (updateList.length === 0 && parents.length === 0) {
  console.info('All files already exist')
}
