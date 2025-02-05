import { parse } from 'yaml'
import markdownit from 'markdown-it'
import { separator } from './config.js'
import { readFile } from './filesys.js'

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
})

type ParseMd = (filePath: string) => {
  title: string
  layout: string
  menuShort: string
  menuLong: string
  body: string
}

export const parseMd: ParseMd = (filePath: string) => {
  const content = readFile(filePath)
  const parts = content.split(separator)
  return {
    ...parse(
      parts[0]
        .trim()
        .replace(/^```yaml/, '')
        .replace(/```$/, ''),
    ),
    body: md.render(parts[1]),
  }
}
