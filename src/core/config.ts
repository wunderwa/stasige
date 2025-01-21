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

type GetConfig = ({ root, siteName }: { root?: string; siteName: string }) => {
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

export const getConfig: GetConfig = ({ root, siteName }) => {
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
) => {
  const mainLang = langs[0]
  return langs.map((lng) => ({
    url: `${mainLang === lng ? '' : '/' + lng}${dirBase}`,
    title: lng,
    lang: lng,
    disabled: lng === lang,
  }))
}
