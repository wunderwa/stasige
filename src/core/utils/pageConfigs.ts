import { pageRegExp } from './config.js'
import { dirname } from 'node:path'
import { parseMd } from './parseMd.js'
import { BuildConfig, CoreConfig, PageConfig } from './types.js'
import { readDir } from './filesys.js'

type GetPageConfig = {
  mainLang: string
  page: string
  src: string
}

export const onePageConfig = ({
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
    ...parseMd(src, pathBase),
  }
}

type GetPageConfigList = {
  coreConfig: CoreConfig
  buildConfig: BuildConfig
}

export const getPageConfigList = async ({
  coreConfig,
  buildConfig,
}: GetPageConfigList): Promise<PageConfig[]> => {
  const { pagesFullPath, pathInPages } = coreConfig
  return (await readDir(pagesFullPath))
    .filter((page) => page.match(pageRegExp))
    .map((page) =>
      onePageConfig({
        page,
        src: pathInPages(page),
        mainLang: buildConfig.langs[0],
      }),
    )
}
