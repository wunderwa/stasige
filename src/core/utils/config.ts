import { CoreConfig } from './types.js'
import { join } from 'node:path'

export const separator = '<!--config-->'
const SITES = 'sites'
const DIST = 'dist'
const HTTP = 'http'
const SITE_NAME = 'default'
const ROOT = process.cwd()
const VIEWS = 'views'
const LAYOUTS = join(VIEWS, 'layouts')
const PAGES = 'pages'
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
    join(rootPath, dev ? HTTP : DIST, siteDir, filePath)

  return {
    timekey: dev ? 'dev' : Date.now().toString(36),
    buildConfigPath: inRoot(FILE.build),
    styleIndexPath: inRoot(FILE.style),
    scriptIndexPath: inRoot(FILE.script),
    pagesFullPath: inRoot(PAGES),
    distDir: pathInBuild(),
    pathInPages: (page = '') => inRoot(PAGES, page),
    pathInView: (page) => inRoot(VIEWS, page),
    layoutByName: (name) => inRoot(LAYOUTS, `${name}.${PUG}`),
    pathInBuild,
  }
}
