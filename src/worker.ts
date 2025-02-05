import { CoreConfig } from './core/utils/types.js'
import { getConfig, readConfig, writeFile } from './core/utils/index.js'
import {
  checkParents,
  genUpdateList,
  getDefaultContent,
  parseLangs,
} from './worker/index.js'

const siteName = process.argv.slice(2)[0] ?? 'default'
const pageDir = process.argv.slice(2)[1]
const langParam = process.argv.slice(2)[2]

const coreConfig: CoreConfig = getConfig({ siteName, dev: true })
const { buildConfigPath, pathInPages } = coreConfig
const { langs } = readConfig(buildConfigPath)

const main = {
  langs: parseLangs(langParam, langs),
}

const updateList = genUpdateList({
  pageDir,
  pathInPages,
  langs: main.langs,
})

for (const { lang, dir, filePath } of updateList) {
  const content = getDefaultContent(dir, lang)
  await writeFile(filePath, content)
}

if (updateList.length) {
  console.log(
    '\nUpdate List:\n',
    updateList.map(({ dir, lang }) => ` - ${lang} ${dir}`).join('\n'),
  )
}

const parents = checkParents({
  pageDir: pageDir,
  pathInPages,
  langs: main.langs,
}).reduce(
  (acc: string[], { dir, lang }) => [
    ...acc,
    `  ./wrk -a ${siteName} ${dir} ${lang}`,
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
