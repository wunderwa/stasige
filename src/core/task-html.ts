import { BuildConfig, CoreConfig, PageConfig } from './utils/types.js'
import { genPage, getMenus, info, getPageConfigList } from './utils/index.js'

type TaskHtmlProps = {
  buildConfig: BuildConfig
  coreConfig: CoreConfig
}

export const taskHtml = async ({
  buildConfig,
  coreConfig,
}: TaskHtmlProps): Promise<void> => {
  info('t', 'Task: HTML')

  const pageConfigs: PageConfig[] = await getPageConfigList({
    coreConfig,
    buildConfig,
  })
  const menus = getMenus(pageConfigs, buildConfig.langs)

  pageConfigs.forEach((pageConfig) => {
    genPage({
      buildConfig,
      coreConfig,
      pageConfig,
      menu: menus,
    })
  })
}
