import pug from 'pug'
import {
  BuildConfig,
  CoreConfig,
  Menu,
  PageConfig,
  PugLayoutLocals,
  PugViewLocals,
} from './types.js'
import { joinPath, writeFile } from './filesys.js'
import { getPageLangs } from './langs.js'

type GenPage = {
  buildConfig: BuildConfig
  coreConfig: CoreConfig
  pageConfig: PageConfig
  menu: Menu
}

export const genPage = async ({
  buildConfig,
  coreConfig,
  pageConfig,
  menu,
}: GenPage) => {
  const { timekey, layoutByName, pathInView, pathInDist } = coreConfig
  const compileLayoutFunc = pug.compileFile(layoutByName(pageConfig.layout))
  const { lang, dir, dirBase } = pageConfig
  const { langs, meta, links } = buildConfig

  const layoutLocals: PugLayoutLocals = {
    ...pageConfig,
    langs,
    meta,
    links,
    menu,
  }

  const viewLocals: PugViewLocals = {
    ...layoutLocals,
    timekey,
    content: compileLayoutFunc(layoutLocals),
    pageLangs: getPageLangs(langs, lang, menu.byDir[dirBase]),
  }

  const compileViewFunc = pug.compileFile(pathInView('index.pug'))
  const pageContent = compileViewFunc(viewLocals)

  const pagePath = pathInDist(joinPath([dir], 'index.html'))
  await writeFile(pagePath, pageContent)
}
