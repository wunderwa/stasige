import { parse } from 'yaml'
import markdownit from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'
import { distImgDir, markdownAllowedAttributes, separator } from './config.js'
import { readFile } from './filesys.js'
import { join } from 'node:path'
import { DeepObject } from './types.js'
import { buildVarsMap } from './buildVarsMap.js'

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
  build: DeepObject,
) => {
  title: string
  layout: string
  menuShort: string
  menuLong: string
  body: string
}

export const parseMd: ParseMd = (filePath: string, pathBase: string, build) => {
  const content = readFile(filePath)
  const [yamlConf, ...mdList] = content.split(separator)

  const imgPath = join('/', distImgDir, pathBase, '/')

  const po = buildVarsMap(build)
  const srcMd = Object.keys(po).reduce(
    (acc: string, key: string) => acc.replaceAll(key, po[key]),
    mdList.join(separator),
  )

  return {
    layout: 'default',
    ...parse(
      yamlConf
        .trim()
        .replace(/^```yaml/, '')
        .replace(/```$/, ''),
    ),
    body: md
      .render(srcMd)
      .replace(/<img\s+src="-img\//g, '<img src="' + imgPath)
      .replace(/<img\s+src="([^"]+\.(jpg|png))/g, '<img src="$1.webp'),
  }
}
