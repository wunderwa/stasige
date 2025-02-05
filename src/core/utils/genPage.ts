import pug from 'pug'
import {
  BuildConfig,
  CoreConfig,
  Menus,
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
  menu: Menus
}

export const genPage = async ({
  buildConfig,
  coreConfig,
  pageConfig,
  menu,
}: GenPage) => {
  const { timekey, layoutByName, pathInView, pathInBuild } = coreConfig
  const { lang, path, pathBase, layout } = pageConfig
  const { langs } = buildConfig
  const compileLayoutFunc = pug.compileFile(layoutByName(layout))

  const layoutLocals: PugLayoutLocals = {
    ...pageConfig,
    ...menu,
    ...buildConfig,
    timekey,
  }

  const viewLocals: PugViewLocals = {
    ...layoutLocals,
    content: compileLayoutFunc(layoutLocals),
    pageLangs: getPageLangs(langs, lang, menu.linksByDir[pathBase]),
  }

  const compileViewFunc = pug.compileFile(pathInView('index.pug'))
  const pageContent = compileViewFunc(viewLocals)

  const pagePath = pathInBuild(joinPath([path], 'index.html'))
  await writeFile(pagePath, pageContent)
}
