import pug from 'pug'
import {
  BuildConfig,
  CoreConfig,
  PageConfig,
  PugLayoutLocals,
  PugViewLocals,
} from './types.js'
import { getPageLangs } from './config.js'
import { joinPath, writeFile } from './filesys.js'

type GenPage = {
  buildConfig: BuildConfig
  coreConfig: CoreConfig
  pageConfig: PageConfig
}

export const genPage = async ({
  buildConfig,
  coreConfig,
  pageConfig,
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
  }

  const viewLocals: PugViewLocals = {
    ...layoutLocals,
    timekey,
    content: compileLayoutFunc(layoutLocals),
    pageLangs: getPageLangs(langs, lang, dirBase),
  }

  const compileViewFunc = pug.compileFile(pathInView('index.pug'))
  const pageContent = compileViewFunc(viewLocals)

  const pagePath = pathInDist(joinPath([dir], 'index.html'))
  await writeFile(pagePath, pageContent)
}
