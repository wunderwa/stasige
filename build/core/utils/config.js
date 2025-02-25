import { join } from 'node:path';
import { readConfig } from './filesys.js';
export const separator = '<!--config-->';
// empty array = all attributes are allowed
export const markdownAllowedAttributes = [
    'id',
    'class',
    'title',
    'data-clicker',
    'target',
];
export const distImgDir = 'i';
export const distAssetsDir = 'a/';
const SITES = 'sites';
// const SITES_MONO = 'site'
const SITES_MONO = '';
export const DIST_PROD = 'dist';
export const DIST_DEV = 'dev';
const SITE_NAME = 'default';
const ROOT = process.cwd();
const ASSETS = 'assets';
const VIEWS = 'views';
const LAYOUTS = join(VIEWS, 'layouts');
const PAGES = 'pages';
const DATA = 'data';
const FILE = {
    style: join('styles', 'index.scss'),
    script: join('scripts', 'index.ts'),
    view: join(VIEWS, 'index.pug'),
    build: 'build.json',
    deploy: 'deploy.json',
};
export const def = {};
export const pageRegExp = /index\.([a-z]{2})\.md/;
const PUG = 'pug';
export const getConfig = ({ mono, dev, siteName }) => {
    const siteDir = mono ? '' : (siteName ?? SITE_NAME);
    const siteRoot = join(ROOT, mono ? SITES_MONO : SITES, siteDir);
    const inRoot = (...list) => join(siteRoot, ...list);
    const pathInBuild = (filePath = '') => join(ROOT, dev ? DIST_DEV : DIST_PROD, siteDir, filePath);
    const buildConfigPath = inRoot(FILE.build);
    const build = readConfig(buildConfigPath);
    return {
        build,
        dev,
        timekey: dev ? 'dev' : Date.now().toString(36),
        buildConfigPath,
        deployConfigPath: inRoot(FILE.deploy),
        styleIndexPath: inRoot(FILE.style),
        scriptIndexPath: inRoot(FILE.script),
        viewIndexPath: inRoot(FILE.view),
        pagesFullPath: inRoot(PAGES),
        distDir: pathInBuild(),
        pathInAssets: (file = '') => inRoot(ASSETS, file),
        pathInData: (file = '') => inRoot(DATA, file),
        pathInPages: (page = '') => inRoot(PAGES, page),
        pathInView: (page) => inRoot(VIEWS, page),
        layoutByName: (name) => inRoot(LAYOUTS, `${name}.${PUG}`),
        pathInBuild,
    };
};
