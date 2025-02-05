import { PageConfig } from './types.js'
import { info } from './index.js'

const infoPage = (pg: PageConfig) => {
  info('n', `${pg.pathBase} : ${pg.lang}`)
}

export const findPage = (
  pageConfigs: PageConfig[],
  logList: string[],
): PageConfig => {
  const withLang = pageConfigs.find(
    ({ pathBase, lang }) => pathBase === logList[0] && lang === logList[1],
  )

  if (withLang) {
    infoPage(withLang)
    return withLang
  }

  const pg =
    pageConfigs.find(({ pathBase }) => pathBase === logList[0]) ??
    pageConfigs[0]
  infoPage(pg)
  return pg
}
