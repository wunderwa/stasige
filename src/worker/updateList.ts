import { join, sep } from 'node:path'
import { existsSync } from 'node:fs'

type Params = {
  pageDir: string
  langs: string[]
  pathInPages: (filePath: string) => string
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
  pageDir,
  langs,
  pathInPages,
  onlyMissing = true,
}: Params) => {
  const parents: PageInfo[] = langs.reduce(
    (acc: PageInfo[], lang): PageInfo[] => {
      const list = pageDir
        .split(sep)
        .slice(0, -1)
        .reduce(
          (acc: string[], dirName) => [
            ...acc,
            join(acc[acc.length - 1] ?? '', dirName),
          ],
          [],
        )
        .map((dir: string): PageInfo => {
          const filePath = pathInPages(join(dir, fileName(lang)))
          return {
            dir,
            filePath,
            lang,
            exists: existsSync(filePath),
          }
        })

      return [...acc, ...list]
    },
    [],
  )
  return onlyMissing ? parents.filter(({ exists }) => !exists) : parents
}

export const genUpdateList = ({
  pageDir,
  langs,
  pathInPages,
  onlyMissing = true,
}: Params) => {
  const list: PageInfo[] = langs.map((lang) => {
    const filePath = pathInPages(join(pageDir, fileName(lang)))
    return {
      dir: pageDir,
      filePath: filePath,
      lang,
      exists: existsSync(filePath),
    }
  })
  return onlyMissing ? list.filter(({ exists }) => !exists) : list
}
