import {
  BuildConfig,
  CoreConfig,
  Menus,
  PageConfig,
  PugLayoutLocals,
} from './utils/types.js'
import { findPage, getMenus, getPageConfigList, info } from './utils/index.js'

type TaskVarProps = {
  buildConfig: BuildConfig
  coreConfig: CoreConfig
  varList: string[]
}

export const taskVars = async ({
  buildConfig,
  coreConfig,
  varList,
}: TaskVarProps) => {
  const { timekey } = coreConfig

  const pageConfigs: PageConfig[] = await getPageConfigList({
    coreConfig,
    buildConfig,
  })
  const menus: Menus = getMenus(pageConfigs, buildConfig.langs)

  const pageConfig = findPage(pageConfigs, varList)

  const layoutLocals: PugLayoutLocals = {
    ...pageConfig,
    ...menus,
    ...buildConfig,
    timekey,
  }

  info('n', '* VARS in PUG *')
  if (varList.length === 0) {
    console.info(
      'add -L param to command like -L langs | -L langs,meta before <site> name to show values',
      '\n',
      'yarn wrk -DVL langs,meta',
    )
    console.info('page params will show for  [0] (first) page')
    console.info('Add pathBase = `/` to command like `- /,title,menuShort`')
  }

  Object.keys(layoutLocals).forEach((key) => {
    info('n', `${key}=`)
    if (varList.includes(key)) {
      info('j', layoutLocals[key as keyof PugLayoutLocals])
    }
  })
}
