import { separator } from '../utils/index.js';
export const getDefaultContent = (filePath, _lang) => [
    '```yaml',
    'layout: default',
    `menuShort: ${filePath} ${_lang}`,
    `menuLong: ${filePath} ${_lang}`,
    `title: ${filePath} ${_lang} title`,
    '```',
    separator,
    `## ${filePath} ${_lang}`,
].join('\n');
