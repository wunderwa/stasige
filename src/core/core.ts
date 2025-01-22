import { getConfig } from './config.js'
import { cleanDir, readConfig } from './filesys.js'
import { taskScript } from './task-script.js'
import { taskStyle } from './task-style.js'
import { CoreConfig } from './types.js'
import { taskHtml } from './task-html.js'

type CoreProps = {
  siteName: string
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
}: CoreProps): Promise<CoreResp> => {
  const coreConfig: CoreConfig = getConfig({ siteName, root })
  const { timekey, buildConfigPath, stylePath, scriptPath, distDir } =
    coreConfig

  const buildConfig = readConfig(buildConfigPath)

  return {
    cleanDist: () => cleanDir(distDir),
    renderHtml: () => taskHtml({ buildConfig, coreConfig }),
    renderStyle: () => taskStyle({ timekey, stylePath, distDir }),
    renderScript: () => taskScript({ timekey, scriptPath, distDir }),
  }
}
