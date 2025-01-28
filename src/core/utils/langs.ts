import { MenuItem, PageLang } from './types.js'

type Dirs = {
  [lng: string]: MenuItem
}

const getItem = (it: MenuItem, lang: string) => ({
  url: it.dir,
  title: it.lang,
  lang: it.lang,
  disabled: it.lang === lang,
})

export const getPageLangs = (
  langs: string[],
  lang: string,
  dirs: Dirs,
): PageLang[] =>
  langs.reduce(
    (acc: PageLang[], _lang: string) =>
      dirs[_lang] ? [...acc, getItem(dirs[_lang], lang)] : acc,
    [],
  )
