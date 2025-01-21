import * as path from 'node:path'
import pug from 'pug'
import { getConfig, pageRe, getPageLangs } from './config.js'
import {
  cleanDir,
  readDir,
  readConfig,
  writeFile,
  joinPath,
} from './filesys.js'
import { parseMd } from './md.js'
import { taskScript } from './task-script.js'
import { taskStyle } from './task-style.js'

type CoreProps = {
  siteName: string
  root?: string
}
type CoreResp = {
  cleanDist: () => void
  renderHtml: () => Promise<void>
  renderScript: () => Promise<void>
  renderStyle: () => void
}

export const Core = async ({
  siteName,
  root,
}: CoreProps): Promise<CoreResp> => {
  const {
    timekey,
    buildConfigPath,
    stylePath,
    scriptPath,
    pagesPath,
    pathInPages,
    distPath,
    pathInDist,
    pathInView,
    layoutByName,
  } = getConfig({ siteName, root })

  const buildConfig = readConfig(buildConfigPath)

  const renderHtml = async (): Promise<void> => {
    const pages = (await readDir(pagesPath))
      .filter((page) => page.match(pageRe))
      .map((page) => {
        const lang = page.match(pageRe)[1]
        const isMainLang = lang === buildConfig.langs[0]
        const dirBase = path.dirname(`/${page}`)
        const dir = `${isMainLang ? '' : '/' + lang}${dirBase}`
        const src = pathInPages(page)
        return {
          lang,
          src,
          dir,
          dirBase,
          ...parseMd(src),
        }
      })

    pages.forEach((page) => {
      const compilContentFunc = pug.compileFile(
        layoutByName(page.layout),
        null,
      )
      const { body, ...pageConfig } = page
      const bodyContent = compilContentFunc({ content: body })

      const compilePageFunc = pug.compileFile(
        pathInView('index.pug'),
        null,
      )
      const pageContent = compilePageFunc({
        timekey,
        lang: pageConfig.lang,
        title: pageConfig.title,
        content: bodyContent,
        menuName: pageConfig.menu,
        dir: pageConfig.dir,
        pageLangs: getPageLangs(
          buildConfig.langs,
          pageConfig.lang,
          pageConfig.dirBase,
        ),
        langs: buildConfig.langs,
        meta: buildConfig.meta,
        links: buildConfig.links,
      })

      const pagePath = pathInDist(joinPath([page.dir], 'index.html'))
      writeFile(pagePath, pageContent)
    })
  }

  return {
    cleanDist: () => cleanDir(distPath),
    renderHtml,
    renderStyle: () => {
      taskStyle({ timekey, stylePath, distPath })
    },
    renderScript: async () => {
      await taskScript({ timekey, scriptPath, distPath })
    },
  }
}
