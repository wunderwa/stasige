import removeMarkdown from 'remove-markdown'
import {
  getArgv,
  minActions,
  MinArgv,
  readFile,
  writeFile,
} from './core/utils/index.js'

const argv: MinArgv = getArgv()
minActions('doc', argv)

const acrion = argv._[0]

const texts = ['man', 'wrk', 'copy', 'srv', 'new', 'vars', 'doc']
const parts = ['man', 'wrk', 'copy', 'srv', 'new', 'vars']

const doTexts = async () => {
  for (const name of texts) {
    const md = readFile(`docs/yarn/${name}.md`)
    const txt = removeMarkdown(md)
    await writeFile(`src/help/yarn-${name}.txt`, txt)
  }
}

const doPage = async () => {
  const list = parts.map((name) => readFile(`docs/yarn/${name}.md`))
  const body = [readFile('docs/docs-manual-vars.md'), ...list].join('\n')
  await writeFile('sites/default/pages/docs/manual/index.en.md', body)
}

switch (acrion) {
  case 'text':
    await doTexts()
    break
  case 'page':
    await doPage()
    break
  default:
    await doTexts()
    await doPage()
}
