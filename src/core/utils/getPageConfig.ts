import { pageRegExp } from './config.js'
import path from 'node:path'
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
  const dirBase: string = path.dirname(`/${page}`) as string
  const dir = `${isMainLang ? '' : '/' + lang}${dirBase}`
  return {
    lang,
    src,
    dir,
    dirBase,
    ...parseMd(src),
  }
}
