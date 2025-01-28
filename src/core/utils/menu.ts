import {
  Menu,
  MenuByDir,
  MenuByLang,
  MenuItem,
  MenuMain,
  MenuMainItem,
  PageConfig,
} from './types.js'

const gropeByDir = (pages: PageConfig[], langs: string[]): MenuByDir =>
  pages.reduce(
    (acc: MenuByDir, { lang, dir, dirBase, menuName, title }) =>
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

const gropeByLang = (pages: PageConfig[], langs: string[]): MenuByLang =>
  pages.reduce(
    (acc: MenuByLang, { lang, dir, dirBase, menuName, title }) =>
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

const groupChildren = (pages: MenuItem[]) => {
  const mapped = pages.map(({ lang, dirBase, dir, title, menuName }) => {
    const path = [lang, ...dirBase.split('/').filter((d) => d !== '')]
    return {
      lang,
      dirBase,
      dir,
      title,
      menuName,
      id: path.join(':'),
      pid: path.slice(0, -1).join(':'),
    }
  })

  const getChildren = (_id: string): MenuMainItem[] => {
    return mapped
      .filter(({ pid: _pid }) => _pid === _id)
      .map(({ id, pid, ...item }) => ({
        ...item,
        children: getChildren(id),
      }))
  }

  return mapped
    .filter(({ pid }) => pid == '')
    .map(({ id, pid, ...item }) => ({
      ...item,
      children: getChildren(id),
    }))
}

const groupChildrenByLang = (byLang: MenuByLang): MenuMain =>
  Object.keys(byLang).reduce(
    (acc: MenuMain, lang) => ({
      ...acc,
      [lang]: groupChildren(Object.values(byLang[lang])),
    }),
    {},
  )

export const getMenu = (pages: PageConfig[], langs: string[]): Menu => {
  const byLang: MenuByLang = gropeByLang(pages, langs)
  const byDir: MenuByDir = gropeByDir(pages, langs)
  const main = groupChildrenByLang(byLang)

  // console.log(JSON.stringify(main, null, 2))

  return {
    byLang,
    byDir,
    main,
  }
}
