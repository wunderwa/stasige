import { genPage, getMenus, info, getPageConfigList } from './utils/index.js';
export const taskHtml = async (coreConfig) => {
    info('title', 'Task: HTML');
    const pageConfigs = await getPageConfigList(coreConfig);
    const menus = getMenus(pageConfigs, coreConfig?.build?.langs ?? []);
    pageConfigs.forEach((pageConfig) => {
        genPage({
            coreConfig,
            pageConfig,
            menu: menus,
        });
    });
};
