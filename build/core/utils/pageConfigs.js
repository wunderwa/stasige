import { pageRegExp } from './config.js';
import { dirname } from 'node:path';
import { parseMd } from './parseMd.js';
import { readDir } from './filesys.js';
export const onePageConfig = ({ page, src, mainLang, }) => {
    const lang = page.match(pageRegExp)?.[1];
    const isMainLang = lang === mainLang;
    const pathBase = dirname(`/${page}`);
    const path = `${isMainLang ? '' : '/' + lang}${pathBase}`;
    return {
        lang,
        src,
        path,
        pathBase,
        ...parseMd(src, pathBase),
    };
};
export const getPageConfigList = async (coreConfig) => {
    const { pagesFullPath, pathInPages, build } = coreConfig;
    return (await readDir(pagesFullPath))
        .filter((page) => page.match(pageRegExp))
        .map((page) => onePageConfig({
        page,
        src: pathInPages(page),
        mainLang: build?.langs[0] ?? '',
    }));
};
