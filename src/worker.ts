import { CoreConfig } from './core/utils/types.js'
import { getConfig, readConfig, writeFile } from './core/utils/index.js'
import { checkParents, genUpdateList, parseLangs } from './worker/index.js'

const siteName = process.argv.slice(2)[0] ?? 'default'
const path = process.argv.slice(2)[1]
const langParam = process.argv.slice(2)[2]

console.log({ siteName, path, langParam })

const coreConfig: CoreConfig = getConfig({ siteName, devMode: true })
const { buildConfigPath, pathInPages } = coreConfig
const { langs } = readConfig(buildConfigPath)

const main = {
  langs: parseLangs(langParam, langs),
}

const updateList = genUpdateList({
  page: path,
  pathInPages,
  langs: main.langs,
}) // .map(({ filePath }) => filePath)

for (const item of updateList) {
  const content = ''
  await writeFile(item.filePath, content)
}

console.log('updateList', updateList)

const parents = checkParents({
  page: path,
  pathInPages,
  langs: main.langs,
}).reduce(
  (acc: string[], { dir, lang }) => [
    ...acc,
    `  ./wrk -a ${dir} ${siteName} ${lang}`,
  ],
  [],
)

if (parents.length) {
  console.log(
    'Missing some parents pages. New pages will not included in Main menu',
  )
  console.log('Run commands to create parents pages\n')
  console.log(parents.join('\n'))
}
