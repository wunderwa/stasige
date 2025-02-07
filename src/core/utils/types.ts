export type CoreConfig = {
  timekey: string
  buildConfigPath: string
  styleIndexPath: string
  scriptIndexPath: string
  pagesFullPath: string
  distDir: string
  pathInAssets: (file?: string) => string
  pathInPages: (page?: string) => string
  pathInView: (page: string) => string
  layoutByName: (page: string) => string
  pathInBuild: (page?: string) => string
}

type Langs = 'ru' | 'en' | string
type LinkKey = Langs | 'url'
type MetaType = 'title' | 'description' | string
type LinkType = 'app' | 'download' | string

type Meta = {
  [key: string]: {
    [key: MetaType]: string
  }
}

type Links = {
  [key: LinkType]: {
    [key: LinkKey]: string
  }
}

export type BuildConfig = {
  langs: Langs[]
  meta: Meta
  links: Links
}

export type PageLang = {
  url: string
  title: string
  lang: string
  disabled: boolean
}

export type PageConfig = {
  title: string
  layout: string
  menuShort: string
  menuLong: string
  body: string
  lang: string
  src: string
  path: string
  pathBase: string
}

export type MenuItem = {
  lang: string
  path: string
  pathBase: string
  menuShort: string
  menuLong: string
  title: string
}

export type LinksByLang = {
  [lang: string]: {
    [pathBase: string]: MenuItem
  }
}

export type LinksByDir = {
  [pathBase: string]: {
    [lang: string]: MenuItem
  }
}

export type MenuMainItem = MenuItem & {
  children: MenuMainItem[]
}
export type MainMenu = {
  [lang: string]: MenuMainItem[]
}

export type Menus = {
  linksByLang: LinksByLang
  linksByDir: LinksByDir
  mainMenu: MainMenu
}

export type PugLayoutLocals = PageConfig &
  Menus &
  BuildConfig & {
    timekey: string
    data: {
      [lang: string]: unknown
    }
    func: {
      assets: (s: string) => string
    }
  }

export type PugViewLocals = PugLayoutLocals & {
  content: string
  pageLangs: PageLang[]
}
