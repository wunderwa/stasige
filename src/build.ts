import { Core } from './core/core.js'

const siteName = process.argv.slice(2)[0] ?? 'default'
const props = process.argv.slice(2)[1] ?? 'CSJH'
const fullDevBuild = props === 'D'

const opt = {
  dev: props.includes('D'),
  clean: props.includes('C') || fullDevBuild,
  style: props.includes('S') || fullDevBuild,
  script: props.includes('J') || fullDevBuild,
  html: props.includes('H') || fullDevBuild,
}

const core = await Core({
  siteName,
  devMode: opt.dev,
})

if (opt.clean) {
  if (opt.dev) {
    core.cleanDist()
  } else {
    core.removeDist()
  }
}

if (opt.style) core.renderStyle()
if (opt.script) await core.renderScript()
if (opt.html) await core.renderHtml()
