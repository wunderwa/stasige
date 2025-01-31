import minimist from 'minimist'
import { Core } from './core/core.js'

const opts = {
  boolean: ['D', 'C', 'S', 'J', 'H'],
  alias: {
    D: 'dev',
    C: 'clear',
    S: 'css',
    J: 'js',
    H: 'html',
    L: 'log',
  },
}

type Argv = {
  dev: boolean
  clear: boolean
  css: boolean
  js: boolean
  html: boolean
  log: boolean
  _: string[]
}
const argv: Argv = minimist<Argv>(process.argv.slice(2), opts)
const { dev, log } = argv
const site = argv._[0]

const core = await Core({
  siteName: site,
  dev,
  log,
})

if (dev) {
  const fullDevBuild = !argv.clear && !argv.css && !argv.js && !argv.html
  const opt = {
    clear: argv.clear || fullDevBuild,
    styles: argv.css || fullDevBuild,
    script: argv.js || fullDevBuild,
    html: argv.html || fullDevBuild,
  }

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
