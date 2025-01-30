export const getDefaultContent = (path: string, lang: string) =>
  [
    '```yaml',
    'layout: default',
    `menuName: ${path} ${lang}`,
    `title: ${path} ${lang} title`,
    '```',
    '<!--config-->',
    `## ${path} ${lang}`
  ].join('\n')
