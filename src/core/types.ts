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
  pathInDist: (page?: string) => string
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
  ssh: string
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
  dir: string
  dirBase: string
}

export type PugLayoutLocals = PageConfig & {
  langs: string[]
  links: Links
  meta: Meta
}

export type PugViewLocals = PugLayoutLocals & {
  timekey: string
  content: string
  pageLangs: PageLang[]
}
