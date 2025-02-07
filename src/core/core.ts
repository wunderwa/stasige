import { getConfig, cleanDir, readConfig, info } from './utils/index.js'
import { CoreConfig } from './utils/types.js'
import { taskScript } from './task-script.js'
import { taskStyle } from './task-style.js'
import { taskHtml } from './task-html.js'
import { taskVars } from './task-vars.js'
import { taskImages } from './task-images.js'

type CoreProps = {
  siteName: string
  dev?: boolean
  log?: boolean
  varList: string[]
  root?: string
}
type CoreResp = {
  cleanDist: () => void
  renderHtml: () => Promise<void>
  renderVars: () => Promise<void>
  renderScript: () => Promise<void>
  renderStyle: () => void
  copyImages: () => void
}

export const Core = async ({
  siteName,
  root,
  dev = false,
  varList = [],
}: CoreProps): Promise<CoreResp> => {
  console.log(varList)
  const coreConfig: CoreConfig = getConfig({ siteName, root, dev })
  const { timekey, buildConfigPath, styleIndexPath, scriptIndexPath, distDir } =
    coreConfig

  const buildConfig = readConfig(buildConfigPath)

  return {
    cleanDist: () => {
      info('t', 'Task: CLEAN')
      cleanDir(distDir)
    },
    renderHtml: () => taskHtml({ buildConfig, coreConfig }),
    renderVars: () => taskVars({ buildConfig, coreConfig, varList }),
    renderStyle: () => taskStyle({ timekey, styleIndexPath, distDir }),
    renderScript: () => taskScript({ timekey, scriptIndexPath, distDir }),
    copyImages: () => taskImages(coreConfig),
  }
}
