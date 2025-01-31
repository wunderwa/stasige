export const getDefaultContent = (filePath: string, _lang: string) =>
  [
    '```yaml',
    'layout: default',
    `menuName: ${filePath} ${_lang}`,
    `title: ${filePath} ${_lang} title`,
    '```',
    '<!--config-->',
    `## ${filePath} ${_lang}`,
  ].join('\n')
