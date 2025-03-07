import { pageRegExp } from './config.js'
import { dirname } from 'node:path'
import { parseMd } from './parseMd.js'
import { CoreConfig, PageConfig, DeepObject } from './types.js'
import { readDir } from './filesys.js'

type GetPageConfig = {
  build: DeepObject
  mainLang: string
  page: string
  src: string
}

export const onePageConfig = ({
  build,
  page,
  src,
  mainLang,
}: GetPageConfig): PageConfig => {
  const lang: string = page.match(pageRegExp)?.[1] as string
  const isMainLang = lang === mainLang
  const pathBase: string = dirname(`/${page}`) as string
  const path = `${isMainLang ? '' : '/' + lang}${pathBase}`
  return {
    lang,
    src,
    path,
    pathBase,
    ...parseMd(src, pathBase, build),
  }
}

export const getPageConfigList = async (
  coreConfig: CoreConfig,
): Promise<PageConfig[]> => {
  const { pagesFullPath, pathInPages, build } = coreConfig
  const deepBuild: DeepObject = (build ?? {}) as DeepObject
  return (await readDir(pagesFullPath))
    .filter((page) => page.match(pageRegExp))
    .map((page) =>
      onePageConfig({
        page,
        src: pathInPages(page),
        mainLang: build?.langs[0] ?? '',
        build: deepBuild,
      }),
    )
}
