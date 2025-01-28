import { BuildConfig, CoreConfig, PageConfig } from './utils/types.js'
import {
  readDir,
  pageRegExp,
  getPageConfig,
  genPage,
  getMenu,
} from './utils/_.js'

type TaskHtmlProps = {
  buildConfig: BuildConfig
  coreConfig: CoreConfig
}

export const taskHtml = async ({
  buildConfig,
  coreConfig,
}: TaskHtmlProps): Promise<void> => {
  const { pagesPath, pathInPages } = coreConfig

  const pageConfigs: PageConfig[] = (await readDir(pagesPath))
    .filter((page) => page.match(pageRegExp))
    .map((page) =>
      getPageConfig({
        page,
        src: pathInPages(page),
        mainLang: buildConfig.langs[0],
      }),
    )

  const menu = getMenu(pageConfigs, buildConfig.langs)

  menu.main.ru[0].children

  pageConfigs.forEach((pageConfig) => {
    genPage({
      buildConfig,
      coreConfig,
      pageConfig,
      menu,
    })
  })
}
