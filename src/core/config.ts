import { CoreConfig, PageLang } from './types.js'

export const separator = '<!--config-->'

export const defaults = {
  dist: 'www',
  siteName: 'default',
  rootPath: process.cwd(),
}

export const pageRe = /index\.([a-z]{2})\.md/

const PUG = 'pug'

let siteDir = defaults.siteName
let rootPath = defaults.rootPath

const currentSite = (): string => `${rootPath}/sites/${siteDir}`
const pathInDist = (path = '') =>
  `${rootPath}/${defaults.dist}/${siteDir}${path}`

type Params = { root?: string; siteName: string }

export const getConfig = ({ root, siteName }: Params): CoreConfig => {
  siteDir = siteName ?? defaults.siteName
  rootPath = root ?? defaults.rootPath

  const siteRoot = currentSite()

  return {
    timekey: Date.now().toString(36),
    buildConfigPath: `${siteRoot}/build.json`,
    stylePath: `${siteRoot}/styles/index.scss`,
    scriptPath: `${siteRoot}/scripts/index.ts`,
    pagesPath: `${siteRoot}/pages`,
    distDir: pathInDist(),
    pathInPages: (page = '') => `${siteRoot}/pages/${page}`,
    pathInView: (page) => `${siteRoot}/views/${page}`,
    layoutByName: (name) => `${siteRoot}/views/layouts/${name}.${PUG}`,
    pathInDist,
  }
}

export const getPageLangs = (
  langs: string[],
  lang: string,
  dirBase: string,
): PageLang[] => {
  const mainLang = langs[0]
  return langs.map((lng) => ({
    url: `${mainLang === lng ? '' : '/' + lng}${dirBase}`,
    title: lng,
    lang: lng,
    disabled: lng === lang,
  }))
}
