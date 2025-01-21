import { Core } from './core/core.js'

const siteName = process.argv.slice(2)[0] ?? 'default'

const core = await Core({
  siteName,
})

core.cleanDist()
core.renderStyle()
await core.renderScript()
await core.renderHtml()
