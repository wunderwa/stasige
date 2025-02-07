import { PageConfig } from './types.js'
import { info } from './index.js'

const infoPage = (pg: PageConfig) => {
  info('n', `${pg.pathBase} : ${pg.lang}`)
}

export const findPage = (
  pageConfigs: PageConfig[],
  logList: string[],
): PageConfig => {

  if (logList.length === 0) {
    return pageConfigs[0]
  }

  const page = logList[0].split(':')

  console.log('pp',page)
  const withLang = pageConfigs.find(({ pathBase, lang }) => {
    console.log(pathBase, lang)
    return pathBase === page[0] && lang === page[1]
  })

  if (withLang) {
    console.log('---sss---', withLang)
    infoPage(withLang)
    return withLang
  }

  const pg =
    pageConfigs.find(({ pathBase }) => pathBase === page[0]) ?? pageConfigs[0]
  infoPage(pg)
  return pg
}
