import { join, sep } from 'node:path'
import { existsSync } from 'node:fs'

type Params = {
  page: string
  langs: string[]
  pathInPages: (path: string) => string
  onlyMissing?: boolean
}

type PageInfo = {
  dir: string
  filePath: string
  lang: string
  exists: boolean
}

const fileName = (lang: string) => `index.${lang}.md`

export const checkParents = ({
  page,
  langs,
  pathInPages,
  onlyMissing = true,
}: Params) => {
  const parents: PageInfo[] = langs.reduce((acc, lang): PageInfo[] => {
    const list = page
      .split(sep)
      .slice(0, -1)
      .reduce((acc, dir) => [...acc, join(acc[acc.length - 1] ?? '', dir)], [])
      .map((dir) => {
        const filePath = pathInPages(join(dir, fileName(lang)))
        return {
          dir,
          filePath,
          lang,
          exists: existsSync(filePath),
        }
      })

    return [...acc, ...list]
  }, [])
  return onlyMissing ? parents.filter(({ exists }) => !exists) : parents
}

export const genUpdateList = ({
  page,
  langs,
  pathInPages,
  onlyMissing = true,
}: Params) => {
  const list: PageInfo[] = langs.map((lang) => {
    const filePath = pathInPages(join(page, fileName(lang)))
    return {
      dir: page,
      filePath: filePath,
      lang,
      exists: existsSync(filePath),
    }
  })
  return onlyMissing ? list.filter(({ exists }) => !exists) : list
}
