import pug from 'pug'
import {
  CoreConfig,
  Menus,
  PageConfig,
  PugLayoutLocals,
  PugViewLocals,
} from './types.js'
import { joinPath, writeFile } from './filesys.js'
import { getPageLangs } from './langs.js'
import { pugData, pugFunc } from './pugHelpers.js'

type GenPage = {
  coreConfig: CoreConfig
  pageConfig: PageConfig
  menu: Menus
}

export const genPage = async ({ coreConfig, pageConfig, menu }: GenPage) => {
  const { timekey, layoutByName, pathInView, pathInBuild, pathInData, build } =
    coreConfig
  if (!build) {
    return
  }
  const { lang, path, pathBase, layout } = pageConfig
  const { langs } = build
  const compileLayoutFunc = pug.compileFile(layoutByName(layout))

  const layoutLocals: PugLayoutLocals = {
    ...pageConfig,
    ...menu,
    ...build,
    timekey,
    data: pugData(pathInData),
    func: pugFunc(),
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
