import { findPage, getMenus, getPageConfigList, info, pugData, pugFunc, } from './utils/index.js';
export const taskVars = async ({ coreConfig, siteName, page, varList, }) => {
    const { timekey, pathInData, build } = coreConfig;
    if (!build) {
        process.exit(0);
    }
    const pageConfigs = await getPageConfigList(coreConfig);
    const menus = getMenus(pageConfigs, build?.langs ?? []);
    const pageConfig = findPage(pageConfigs, page);
    const layoutLocals = {
        ...pageConfig,
        ...menus,
        ...build,
        timekey,
        data: pugData(pathInData),
        func: pugFunc(),
    };
    info('name', '* VARS in PUG *');
    console.info('page params will be shown for  [0] (first) page', 'if path and lang are incorrect ');
    if (varList.length === 0) {
        console.info('add key list for show global variables values\n');
        info('title', `yarn vars ${siteName} langs,meta`);
    }
    if (!page) {
        console.info('add key path:lang to show variables values of actual page ');
        info('title', `yarn vars ${siteName} /docs:en title,menuShort\n`);
    }
    Object.keys(layoutLocals).forEach((key) => {
        info('name', `${key}=`);
        if (varList.includes(key)) {
            info('json', layoutLocals[key]);
        }
    });
};
