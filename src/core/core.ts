import { getConfig, cleanDir, readConfig, info } from './utils/index.js'
import { BuildConfig, CoreConfig } from './utils/types.js'
import { taskScript } from './task-script.js'
import { taskStyle } from './task-style.js'
import { taskHtml } from './task-html.js'
import { taskImages } from './task-images.js'

type CoreProps = {
  siteName: string
  dev?: boolean
  log?: boolean
  root?: string
}
type CoreResp = {
  cleanDist: () => void
  renderHtml: () => Promise<void>
  renderScript: () => Promise<void>
  renderStyle: () => void
  copyImages: () => void
}

export const Core = async ({
  siteName,
  root,
  dev = false,
}: CoreProps): Promise<CoreResp> => {
  const coreConfig: CoreConfig = getConfig({ siteName, root, dev })
  const { timekey, buildConfigPath, styleIndexPath, scriptIndexPath, distDir } =
    coreConfig

  const buildConfig = readConfig(buildConfigPath) as BuildConfig

  return {
    cleanDist: () => {
      info('title', 'Task: CLEAN')
      cleanDir(distDir)
    },
    renderHtml: () => taskHtml({ buildConfig, coreConfig }),
    renderStyle: () => taskStyle({ timekey, styleIndexPath, distDir }),
    renderScript: () => taskScript({ timekey, scriptIndexPath, distDir }),
    copyImages: () => taskImages(coreConfig),
  }
}
