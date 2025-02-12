import minimist from 'minimist'
import { Core } from './core/core.js'

const opts = {
  boolean: ['D', 'C', 'S', 'J', 'H', 'I'],
  alias: {
    D: 'dev',
    C: 'clear',
    S: 'css',
    J: 'js',
    H: 'html',
    I: 'img',
  },
}

type Argv = {
  dev: boolean
  clear: boolean
  css: boolean
  js: boolean
  html: boolean
  img: boolean
  _: string[]
}
const argv: Argv = minimist<Argv>(process.argv.slice(2), opts)
const { dev } = argv
const site = argv._[0]
const core = await Core({
  siteName: site,
  dev,
})

if (dev) {
  const fullDevBuild =
    !argv.clear && !argv.css && !argv.js && !argv.html && !argv.img
  const opt = {
    clear: argv.clear || fullDevBuild,
    styles: argv.css || fullDevBuild,
    script: argv.js || fullDevBuild,
    html: argv.html || fullDevBuild,
    img: argv.img || fullDevBuild,
  }

  if (opt.clear) core.cleanDist()
  if (opt.styles) core.renderStyle()
  if (opt.script) await core.renderScript()
  if (opt.html) await core.renderHtml()
  if (opt.img) core.copyImages()
} else {
  core.cleanDist()
  core.renderStyle()
  await core.renderScript()
  await core.renderHtml()
  core.copyImages()
}
