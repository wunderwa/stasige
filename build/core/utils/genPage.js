import pug from 'pug';
import { joinPath, writeFile } from './filesys.js';
import { getPageLangs } from './langs.js';
import { pugData, pugFunc } from './pugHelpers.js';
export const genPage = async ({ coreConfig, pageConfig, menu }) => {
    const { timekey, layoutByName, viewIndexPath, pathInBuild, pathInData, build, } = coreConfig;
    if (!build) {
        return;
    }
    const { lang, path, pathBase, layout } = pageConfig;
    const { langs } = build;
    const compileLayoutFunc = pug.compileFile(layoutByName(layout));
    const layoutLocals = {
        ...pageConfig,
        ...menu,
        ...build,
        timekey,
        data: pugData(pathInData),
        func: pugFunc(),
    };
    const viewLocals = {
        ...layoutLocals,
        content: compileLayoutFunc(layoutLocals),
        pageLangs: getPageLangs(langs, lang, menu.linksByDir[pathBase]),
    };
    const compileViewFunc = pug.compileFile(viewIndexPath);
    const pageContent = compileViewFunc(viewLocals);
    const pagePath = pathInBuild(joinPath([path], 'index.html'));
    await writeFile(pagePath, pageContent);
};
