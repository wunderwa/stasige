import { BuildConfig, CoreConfig } from './types.js'
import { join } from 'node:path'
import { readConfig } from './filesys.js'

export const separator = '<!--config-->'

// empty array = all attributes are allowed
export const markdownAllowedAttributes = [
  'id',
  'class',
  'title',
  'data-clicker',
  'target',
]

export const distImgDir = 'i'
export const distAssetsDir = 'a/'
const SITES = 'sites'
export const BUILD_PROD = 'dist'
export const BUILD_DEV = 'http'
const SITE_NAME = 'default'
const ROOT = process.cwd()
const ASSETS = 'assets'
const VIEWS = 'views'
const LAYOUTS = join(VIEWS, 'layouts')
const PAGES = 'pages'
const DATA = 'data'
const FILE = {
  style: join('styles', 'index.scss'),
  script: join('scripts', 'index.ts'),
  build: 'build.json',
}

export const def = {}

export const pageRegExp = /index\.([a-z]{2})\.md/

const PUG = 'pug'

let siteDir = SITE_NAME
let rootPath = ROOT

const currentSite = (): string => join(rootPath, SITES, siteDir)

type Params = {
  root?: string
  siteName: string
  dev: boolean
}

export const getConfig = ({ root, siteName, dev }: Params): CoreConfig => {
  siteDir = siteName ?? SITE_NAME
  rootPath = root ?? ROOT

  const siteRoot = currentSite()
  const inRoot = (...list: string[]) => join(siteRoot, ...list)

  const pathInBuild = (filePath = '') =>
    join(rootPath, dev ? BUILD_DEV : BUILD_PROD, siteDir, filePath)

  const buildConfigPath = inRoot(FILE.build)
  const build = readConfig(buildConfigPath) as BuildConfig

  return {
    build,
    timekey: dev ? 'dev' : Date.now().toString(36),
    buildConfigPath,
    styleIndexPath: inRoot(FILE.style),
    scriptIndexPath: inRoot(FILE.script),
    pagesFullPath: inRoot(PAGES),
    distDir: pathInBuild(),
    pathInAssets: (file = '') => inRoot(ASSETS, file),
    pathInData: (file = '') => inRoot(DATA, file),
    pathInPages: (page = '') => inRoot(PAGES, page),
    pathInView: (page) => inRoot(VIEWS, page),
    layoutByName: (name) => inRoot(LAYOUTS, `${name}.${PUG}`),
    pathInBuild,
  }
}
