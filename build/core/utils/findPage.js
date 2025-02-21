import { info } from './index.js';
const infoPage = (pg) => {
    info('name', `${pg.pathBase} : ${pg.lang}`);
};
export const findPage = (pageConfigs, pageProps) => {
    if (!pageProps) {
        return pageConfigs[0];
    }
    const { pathBase: _path, langs } = pageProps;
    const _lang = langs[0] ?? null;
    let pc;
    if (_path && _lang) {
        pc =
            pageConfigs.find(({ pathBase, lang }) => {
                return pathBase === _path && lang === _lang;
            }) ?? null;
        if (pc) {
            infoPage(pc);
            return pc;
        }
    }
    pc = pageConfigs.find(({ pathBase }) => pathBase === _path) ?? pageConfigs[0];
    infoPage(pc);
    return pc;
};
