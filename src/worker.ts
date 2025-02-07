import { CoreConfig } from './core/utils/types.js'
import { getConfig, readConfig, writeFile } from './core/utils/index.js'
import {
  checkParents,
  genUpdateList,
  getDefaultContent,
  parseLangs,
} from './worker/index.js'

const siteName = process.argv.slice(2)[0] ?? 'default'

const page = process.argv.slice(2)[1]?.split(':')
if(! page?.[0]) {
  console.error('No page params found')
  console.info('yarn wrk -a <site> /page')
  process.exit(1)
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
