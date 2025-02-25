import { Core } from './core/core.js';
import { getArgv, minActions, readMono } from './core/utils/index.js';
const alias = {
    b: 'build',
    d: 'deploy',
    D: 'dev',
    C: 'clearDir',
    S: 'css',
    J: 'js',
    H: 'html',
    I: 'img',
};
const extend = {
    boolean: ['b', 'd', 'D', 'C', 'S', 'J', 'H', 'I'],
    alias,
};
const CMD = 'wrk';
const argv = getArgv(extend);
minActions(CMD, argv);
const mono = readMono();
const { dev, deploy, build } = argv;
const siteName = mono ? '' : argv._[0];
const core = await Core({
    mono,
    siteName,
    dev,
});
if (build) {
    if (dev) {
        const fullDevBuild = !argv.clearDir && !argv.css && !argv.js && !argv.html && !argv.img;
        const opt = {
            clear: argv.clearDir || fullDevBuild,
            styles: argv.css || fullDevBuild,
            script: argv.js || fullDevBuild,
            html: argv.html || fullDevBuild,
            img: argv.img || fullDevBuild,
        };
        if (opt.clear)
            core.cleanDist();
        if (opt.styles)
            core.renderStyle();
        if (opt.script)
            await core.renderScript();
        if (opt.html)
            await core.renderHtml();
        if (opt.img)
            core.copyImages();
    }
    else {
        core.cleanDist();
        core.renderStyle();
        await core.renderScript();
        await core.renderHtml();
        core.copyImages();
    }
}
if (deploy) {
    core.deploy();
}
