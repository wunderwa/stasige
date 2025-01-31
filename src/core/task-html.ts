import { BuildConfig, CoreConfig, PageConfig } from './utils/types.js'
import {
  readDir,
  pageRegExp,
  getPageConfig,
  genPage,
  getMenu,
  info,
} from './utils/index.js'

type TaskHtmlProps = {
  buildConfig: BuildConfig
  coreConfig: CoreConfig
  log: boolean
}

export const taskHtml = async ({
  buildConfig,
  coreConfig,
  log,
}: TaskHtmlProps): Promise<void> => {
  info('t', 'Task: HTML')

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
  if (log) {
    info('n', 'menu.main =')
    info('j', menu.main)

    info('n', 'menu.byDir =')
    info('j', menu.byDir)

    info('n', 'menu.byLang =')
    info('j', menu.byLang)
  }

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
