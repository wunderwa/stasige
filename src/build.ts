import { Core } from './core/core.js'

const siteName = process.argv.slice(2)[0] ?? 'default'
const props = process.argv.slice(2)[1] ?? 'CSJH'


const core = await Core({
  siteName,
})

if(props.includes('C'))
  core.cleanDist()
if(props.includes('S'))
  core.renderStyle()
if(props.includes('J'))
  await core.renderScript()
if(props.includes('H'))
  await core.renderHtml()
