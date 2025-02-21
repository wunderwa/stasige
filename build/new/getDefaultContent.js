export const getDefaultContent = (filePath, _lang) => [
    '```yaml',
    'layout: default',
    `menuShort: ${filePath} ${_lang}`,
    `menuLong: ${filePath} ${_lang}`,
    `title: ${filePath} ${_lang} title`,
    '```',
    '<!--config-->',
    `## ${filePath} ${_lang}`,
].join('\n');
