import { pageRegExp } from './config.js'
import { dirname } from 'node:path'
import { parseMd } from './parseMd.js'
import { PageConfig } from './types.js'

type GetPageConfig = {
  mainLang: string
  page: string
  src: string
}

export const getPageConfig = ({
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
    ...parseMd(src),
  }
}
