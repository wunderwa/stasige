type Langs = 'ru' | 'en' | string
type LinkKey = Langs | 'url'
type MetaType = 'title' | 'description' | string
type LinkType = 'app' | 'download' | string

type Meta = {
  [key: string]: {
    [key: MetaType]: string
  }
}

type Link = {
  [key: LinkType]: {
    [key: LinkKey]: string
  }
}

export type BuildConfig = {
  ssh: string
  langs: Langs[]
  meta: Meta
  links: Link
}
