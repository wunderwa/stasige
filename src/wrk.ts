import { Core } from './core/core.js'
import { getArgv, minActions, MinArgv } from './core/utils/index.js'

type Extend = {
  build: boolean
  deploy: boolean
  dev: boolean
  clearDir: boolean
  css: boolean
  js: boolean
  html: boolean
  img: boolean
  _: string[]
}
const alias: { [k: string]: keyof Extend } = {
  b: 'build',
  d: 'deploy',
  D: 'dev',
  C: 'clearDir',
  S: 'css',
  J: 'js',
  H: 'html',
  I: 'img',
}

const extend = {
  boolean: ['b', 'd', 'D', 'C', 'S', 'J', 'H', 'I'],
  alias,
}
const CMD = 'wrk'

const argv: MinArgv<Extend> = getArgv<Extend>(extend)

minActions(CMD, argv)

const { dev, deploy, build } = argv
const siteName = argv._[0]
const core = await Core({
  siteName,
  dev,
})

if (build) {
  if (dev) {
    const fullDevBuild =
      !argv.clearDir && !argv.css && !argv.js && !argv.html && !argv.img
    const opt = {
      clear: argv.clearDir || fullDevBuild,
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
}
if (deploy) {
  core.deploy()
}
