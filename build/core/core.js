import { getConfig, cleanDir, info } from './utils/index.js';
import { taskScript } from './task-script.js';
import { taskStyle } from './task-style.js';
import { taskHtml } from './task-html.js';
import { taskImages } from './task-images.js';
import { taskDeploy } from './task-deploy.js';
export const Core = async ({ siteName, mono, dev = false, }) => {
    const coreConfig = getConfig({ mono, dev, siteName });
    const { timekey, styleIndexPath, scriptIndexPath, distDir } = coreConfig;
    return {
        cleanDist: () => {
            info('title', 'Task: CLEAN');
            cleanDir(distDir);
        },
        renderHtml: () => taskHtml(coreConfig),
        renderStyle: () => taskStyle({ timekey, styleIndexPath, distDir }),
        renderScript: () => taskScript({ timekey, scriptIndexPath, distDir }),
        copyImages: () => taskImages(coreConfig),
        deploy: () => taskDeploy(coreConfig),
    };
};
