export type CoreConfig = {
  timekey: string
  buildConfigPath: string
  stylePath: string
  scriptPath: string
  pagesPath: string
  distDir: string
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
  menuName: string
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
  menuName: string
  title: string
}

export type MenuByLang = {
  [lang: string]: {
    [pathBase: string]: MenuItem
  }
}

export type MenuByDir = {
  [pathBase: string]: {
    [lang: string]: MenuItem
  }
}

export type MenuMainItem = MenuItem & {
  children: MenuMainItem[]
}
export type MenuMain = {
  [lang: string]: MenuMainItem[]
}

export type Menu = {
  byLang: MenuByLang
  byDir: MenuByDir
  main: MenuMain
}

export type PugLayoutLocals = PageConfig & {
  langs: string[]
  links: Links
  meta: Meta
  menu: Menu
}

export type PugViewLocals = PugLayoutLocals & {
  timekey: string
  content: string
  pageLangs: PageLang[]
}
