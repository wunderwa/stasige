import { getConfig, cleanDir, readConfig, removeDir } from './utils/_.js'
import { CoreConfig } from './utils/types.js'
import { taskScript } from './task-script.js'
import { taskStyle } from './task-style.js'
import { taskHtml } from './task-html.js'

type CoreProps = {
  siteName: string
  devMode?: boolean
  root?: string
}
type CoreResp = {
  cleanDist: () => void
  removeDist: () => void
  renderHtml: () => Promise<void>
  renderScript: () => Promise<void>
  renderStyle: () => void
}

export const Core = async ({
  siteName,
  root,
  devMode = false,
}: CoreProps): Promise<CoreResp> => {
  const coreConfig: CoreConfig = getConfig({ siteName, root, devMode })
  const { timekey, buildConfigPath, stylePath, scriptPath, distDir } =
    coreConfig

  const buildConfig = readConfig(buildConfigPath)

  return {
    cleanDist: () => cleanDir(distDir),
    removeDist: () => removeDir(distDir),
    renderHtml: () => taskHtml({ buildConfig, coreConfig }),
    renderStyle: () => taskStyle({ timekey, stylePath, distDir }),
    renderScript: () => taskScript({ timekey, scriptPath, distDir }),
  }
}
