import {
  Menus,
  LinksByDir,
  LinksByLang,
  MenuItem,
  MainMenu,
  MenuMainItem,
  PageConfig,
} from './types.js'

const gropeByDir = (pages: PageConfig[], langs: string[]): LinksByDir =>
  pages.reduce(
    (acc: LinksByDir, { lang, path, pathBase, menuShort, menuLong, title }) =>
      langs.includes(lang)
        ? {
            ...acc,
            [pathBase]: {
              ...acc[pathBase],
              [lang]: {
                lang,
                path,
                pathBase: pathBase,
                menuShort,
                menuLong,
                title,
              },
            },
          }
        : acc,
    {},
  )

const gropeByLang = (pages: PageConfig[], langs: string[]): LinksByLang =>
  pages.reduce(
    (acc: LinksByLang, { lang, path, pathBase, menuShort, menuLong, title }) =>
      langs.includes(lang)
        ? {
            ...acc,
            [lang]: {
              ...acc[lang],
              [pathBase]: {
                lang,
                path,
                pathBase: pathBase,
                menuShort,
                menuLong,
                title,
              },
            },
          }
        : acc,
    {},
  )

const groupChildren = (pages: MenuItem[]) => {
  const mapped = pages.map(
    ({ lang, pathBase, path, title, menuShort, menuLong }) => {
      const dirList = [lang, ...pathBase.split('/').filter((d) => d !== '')]
      return {
        lang,
        pathBase,
        path,
        title,
        menuShort,
        menuLong,
        id: dirList.join(':'),
        pid: dirList.slice(0, -1).join(':'),
      }
    },
  )

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

const groupChildrenByLang = (byLang: LinksByLang): MainMenu =>
  Object.keys(byLang).reduce(
    (acc: MainMenu, lang) => ({
      ...acc,
      [lang]: groupChildren(Object.values(byLang[lang])),
    }),
    {},
  )

export const getMenus = (pages: PageConfig[], langs: string[]): Menus => {
  const linksByLang: LinksByLang = gropeByLang(pages, langs)
  const linksByDir: LinksByDir = gropeByDir(pages, langs)
  const mainMenu = groupChildrenByLang(linksByLang)

  return {
    linksByLang,
    linksByDir,
    mainMenu,
  }
}
