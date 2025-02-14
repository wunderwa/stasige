import { parse } from 'yaml'
import markdownit from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'
import { distImgDir, markdownAllowedAttributes, separator } from './config.js'
import { readFile } from './filesys.js'
import { join } from 'node:path'

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
})

md.use(markdownItAttrs, {
  // optional, these are default options
  leftDelimiter: '{',
  rightDelimiter: '}',
  allowedAttributes: markdownAllowedAttributes,
})

type ParseMd = (
  filePath: string,
  pathBase: string,
) => {
  title: string
  layout: string
  menuShort: string
  menuLong: string
  body: string
}

export const parseMd: ParseMd = (filePath: string, pathBase) => {
  const content = readFile(filePath)
  const [yamlConf, ...mdList] = content.split(separator)

  const imgPath = join('/', distImgDir, pathBase, '/')
  return {
    layout: 'default',
    ...parse(
      yamlConf
        .trim()
        .replace(/^```yaml/, '')
        .replace(/```$/, ''),
    ),
    body: md
      .render(mdList.join(separator))
      .replace(/<img\s+src="-img\//g, '<img src="' + imgPath)
      .replace(/<img\s+src="([^"]+\.(jpg|png))/g, '<img src="$1.webp'),
  }
}
