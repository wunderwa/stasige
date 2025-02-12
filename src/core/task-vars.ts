import {
  BuildConfig,
  CoreConfig,
  Menus,
  PageConfig,
  PugLayoutLocals,
  PageProps,
} from './utils/types.js'
import {
  findPage,
  getMenus,
  getPageConfigList,
  info,
  pugData,
  pugFunc,
} from './utils/index.js'

type TaskVarProps = {
  buildConfig: BuildConfig
  coreConfig: CoreConfig
  siteName: string
  page: PageProps
  varList: string[]
}

export const taskVars = async ({
  buildConfig,
  coreConfig,
  siteName,
  page,
  varList,
}: TaskVarProps) => {
  const { timekey, pathInData } = coreConfig

  const pageConfigs: PageConfig[] = await getPageConfigList({
    coreConfig,
    buildConfig,
  })
  const menus: Menus = getMenus(pageConfigs, buildConfig.langs)

  const pageConfig = findPage(pageConfigs, page)

  const layoutLocals: PugLayoutLocals = {
    ...pageConfig,
    ...menus,
    ...buildConfig,
    timekey,
    data: pugData(pathInData),
    func: pugFunc(),
  }

  info('name', '* VARS in PUG *')
  console.info(
    'page params will be shown for  [0] (first) page',
    'if path and lang are incorrect ',
  )
  if (varList.length === 0) {
    console.info('add key list for show global variables values\n')
    info('title', `yarn vars ${siteName} langs,meta`)
  }
  if (!page) {
    console.info('add key path:lang to show variables values of actual page ')
    info('title', `yarn vars ${siteName} /docs:en title,menuShort\n`)
  }

  Object.keys(layoutLocals).forEach((key) => {
    info('name', `${key}=`)
    if (varList.includes(key)) {
      info('json', layoutLocals[key as keyof PugLayoutLocals])
    }
  })
}
