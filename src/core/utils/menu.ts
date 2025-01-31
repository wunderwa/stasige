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
    (acc: MenuByDir, { lang, path, pathBase, menuName, title }) =>
      langs.includes(lang)
        ? {
            ...acc,
            [pathBase]: {
              ...acc[pathBase],
              [lang]: { lang, path, pathBase: pathBase, menuName, title },
            },
          }
        : acc,
    {},
  )

const gropeByLang = (pages: PageConfig[], langs: string[]): MenuByLang =>
  pages.reduce(
    (acc: MenuByLang, { lang, path, pathBase, menuName, title }) =>
      langs.includes(lang)
        ? {
            ...acc,
            [lang]: {
              ...acc[lang],
              [pathBase]: { lang, path, pathBase: pathBase, menuName, title },
            },
          }
        : acc,
    {},
  )

const groupChildren = (pages: MenuItem[]) => {
  const mapped = pages.map(({ lang, pathBase, path, title, menuName }) => {
    const dirList = [lang, ...pathBase.split('/').filter((d) => d !== '')]
    return {
      lang,
      pathBase,
      path,
      title,
      menuName,
      id: dirList.join(':'),
      pid: dirList.slice(0, -1).join(':'),
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

  return {
    byLang,
    byDir,
    main,
  }
}
