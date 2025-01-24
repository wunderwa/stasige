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
  const lang = page.match(pageRegExp)?.[1]
  const isMainLang = lang === mainLang
  const dirBase = path.dirname(`/${page}`)
  const dir = `${isMainLang ? '' : '/' + lang}${dirBase}`
  return {
    lang,
    src,
    dir,
    dirBase,
    ...parseMd(src),
  }
}
