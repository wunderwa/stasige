import { join, sep } from 'node:path';
import { existsSync } from 'node:fs';
const fileName = (lang) => `index.${lang}.md`;
export const checkParents = ({ pathBase, langs, pathInPages, onlyMissing = true, }) => {
    const parents = langs.reduce((acc, lang) => {
        const list = pathBase
            .split(sep)
            .slice(0, -1)
            .reduce((acc, dirName) => [
            ...acc,
            join(acc[acc.length - 1] ?? '', dirName),
        ], [])
            .map((pathBase) => {
            const filePath = pathInPages(join(pathBase, fileName(lang)));
            return {
                pathBase,
                filePath,
                lang,
                exists: existsSync(filePath),
            };
        });
        return [...acc, ...list];
    }, []);
    return onlyMissing ? parents.filter(({ exists }) => !exists) : parents;
};
export const genUpdateList = ({ pathBase, langs, pathInPages, onlyMissing = true, }) => {
    const list = langs.map((lang) => {
        const filePath = pathInPages(join(pathBase, fileName(lang)));
        return {
            pathBase,
            filePath: filePath,
            lang,
            exists: existsSync(filePath),
        };
    });
    return onlyMissing ? list.filter(({ exists }) => !exists) : list;
};
