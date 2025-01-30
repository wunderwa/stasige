import minimist from "minimist"
import { Core } from './core/core.js'

type Argv ={
  site: string
  D: boolean
  C: boolean
  S: boolean
  J: boolean
  H: boolean
}
const argv: Argv = minimist<Argv>(process.argv.slice(2))
const dev = argv.D

const core = await Core({
  siteName: argv.site,
  devMode: dev,
})

if (dev) {
  const fullDevBuild = !argv.C && !argv.S && !argv.J && !argv.H
  const opt = {
    clean: argv.C || fullDevBuild,
    style: argv.S || fullDevBuild,
    script: argv.J || fullDevBuild,
    html: argv.H || fullDevBuild,
  }

  if (opt.clean) core.cleanDist()
  if (opt.style) core.renderStyle()
  if (opt.script) await core.renderScript()
  if (opt.html) await core.renderHtml()
} else {
  // core.removeDist() // breaks server dir
  core.cleanDist()
  core.renderStyle()
  await core.renderScript()
  await core.renderHtml()
}
