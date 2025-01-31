import { getConfig, cleanDir, readConfig } from './utils/index.js'
import { CoreConfig } from './utils/types.js'
import { taskScript } from './task-script.js'
import { taskStyle } from './task-style.js'
import { taskHtml } from './task-html.js'

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
}

export const Core = async ({
  siteName,
  root,
  dev = false,
  log = false,
}: CoreProps): Promise<CoreResp> => {
  const coreConfig: CoreConfig = getConfig({ siteName, root, dev })
  const { timekey, buildConfigPath, stylePath, scriptPath, distDir } =
    coreConfig

  const buildConfig = readConfig(buildConfigPath)

  return {
    cleanDist: () => cleanDir(distDir),
    renderHtml: () => taskHtml({ buildConfig, coreConfig, log }),
    renderStyle: () => taskStyle({ timekey, stylePath, distDir }),
    renderScript: () => taskScript({ timekey, scriptPath, distDir }),
  }
}
