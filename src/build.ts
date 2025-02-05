import minimist from 'minimist'
import { Core } from './core/core.js'

const opts = {
  boolean: ['D', 'C', 'S', 'J', 'H', 'V'],
  string: ['var-list'],
  alias: {
    D: 'dev',
    C: 'clear',
    S: 'css',
    J: 'js',
    H: 'html',
    V: 'vars',
    'var-list': 'varList',
  },
}

type Argv = {
  dev: boolean
  clear: boolean
  css: boolean
  js: boolean
  html: boolean
  vars: boolean
  varList: string
  _: string[]
}
const argv: Argv = minimist<Argv>(process.argv.slice(2), opts)
const { dev, varList } = argv
const site = argv._[0]

const core = await Core({
  siteName: site,
  dev,
  varList: varList?.split(',') ?? [],
})

if (dev) {
  const fullDevBuild =
    !argv.clear && !argv.css && !argv.js && !argv.html && !argv.vars
  const opt = {
    vars: argv.vars,
    clear: argv.clear || fullDevBuild,
    styles: argv.css || fullDevBuild,
    script: argv.js || fullDevBuild,
    html: argv.html || fullDevBuild,
  }

  if (opt.vars) await core.renderVars()
  if (opt.clear) core.cleanDist()
  if (opt.styles) core.renderStyle()
  if (opt.script) await core.renderScript()
  if (opt.html) await core.renderHtml()
} else {
  core.cleanDist()
  core.renderStyle()
  await core.renderScript()
  await core.renderHtml()
}
