import { CoreConfig, PageConfig } from './utils/types.js'
import { genPage, getMenus, info, getPageConfigList } from './utils/index.js'

export const taskHtml = async (coreConfig: CoreConfig): Promise<void> => {
  info('title', 'Task: HTML')

  const pageConfigs: PageConfig[] = await getPageConfigList(coreConfig)
  const menus = getMenus(pageConfigs, coreConfig?.build?.langs ?? [])

  pageConfigs.forEach((pageConfig) => {
    genPage({
      coreConfig,
      pageConfig,
      menu: menus,
    })
  })
}
