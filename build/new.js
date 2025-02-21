import { getConfig, printHelp, writeFile, getArgv, minActions, } from './core/utils/index.js';
import { checkParents, genUpdateList, getDefaultContent, parseLangs, } from './new/index.js';
const CMD = 'new';
const argv = getArgv();
minActions(CMD, argv);
const siteName = argv._[0] ?? 'default';
const page = argv._[1]?.split(':');
if (!page?.[0]) {
    printHelp(CMD, {
        error: 'No page params found. See help below',
        exit: true,
    });
}
const coreConfig = getConfig({ siteName, dev: true });
const { pathInPages, build } = coreConfig;
if (!build) {
    process.exit(0);
}
const main = {
    pathBase: page[0],
    langs: parseLangs(build?.langs, page[1]),
};
const updateList = genUpdateList({
    ...main,
    pathInPages,
});
for (const { lang, pathBase, filePath } of updateList) {
    const content = getDefaultContent(pathBase, lang);
    await writeFile(filePath, content);
}
if (updateList.length) {
    console.info('\nUpdate List:\n', updateList.map(({ pathBase, lang }) => ` - ${lang} ${pathBase}`).join('\n'));
}
const parents = checkParents({
    ...main,
    pathInPages,
}).reduce((acc, { pathBase, lang }) => [
    ...acc,
    `  ./wrk -a ${siteName} ${pathBase}:${lang}`,
], []);
if (parents.length) {
    console.info('\nMissing some parents pages. New pages will not included in mainMenu.');
    console.info('Run command to create parent pages:\n');
    console.info(parents.join(' && '));
}
if (updateList.length === 0 && parents.length === 0) {
    console.info('All files already exist');
}
