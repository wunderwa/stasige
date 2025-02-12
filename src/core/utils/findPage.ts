import { PageConfig, PageProps } from './types.js'
import { info } from './index.js'

const infoPage = (pg: PageConfig) => {
  info('name', `${pg.pathBase} : ${pg.lang}`)
}

export const findPage = (
  pageConfigs: PageConfig[],
  pageProps: PageProps,
): PageConfig => {
  if (!pageProps) {
    return pageConfigs[0]
  }
  const { pathBase: _path, langs } = pageProps
  const _lang = langs[0] ?? null

  let pc: PageConfig | null
  if (_path && _lang) {
    pc =
      pageConfigs.find(({ pathBase, lang }) => {
        return pathBase === _path && lang === _lang
      }) ?? null
    if (pc) {
      infoPage(pc)
      return pc
    }
  }

  pc = pageConfigs.find(({ pathBase }) => pathBase === _path) ?? pageConfigs[0]
  infoPage(pc)
  return pc as PageConfig
}
