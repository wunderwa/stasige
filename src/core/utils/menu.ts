import { MenuByDir, MenuByLang, PageConfig } from './types.js'

export const getMenu = (pages: PageConfig[], langs: string[]) => {
  const byLang: MenuByLang = pages.reduce(
    (acc, { lang, dir, dirBase, menuName, title }) =>
      langs.includes(lang)
        ? {
            ...acc,
            [lang]: {
              ...acc[lang],
              [dirBase]: { lang, dir, dirBase, menuName, title },
            },
          }
        : acc,
    {},
  )

  const byDir: MenuByDir = pages.reduce(
    (acc, { lang, dir, dirBase, menuName, title }) =>
      langs.includes(lang)
        ? {
            ...acc,
            [dirBase]: {
              ...acc[dirBase],
              [lang]: { lang, dir, dirBase, menuName, title },
            },
          }
        : acc,
    {},
  )

  console.log(
    pages.map(({lang, dirBase, dir}) => ({lang, dirBase, dir}))
      .sort((a, b) => {
        if(a.dir > b.dir) return 1
        else if(a.dir < b.dir) return -1
        else return 0
      })
  )


  return {
    byLang,
    byDir,
    // main,
  }
}
