import { parse } from 'yaml'
import markdownit from 'markdown-it'
import { separator } from './config.js'
import { readFile } from './filesys.js'

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
})

type ParseMd = (path: string) => {
  title: string
  layout: string
  menuName: string
  body: string
}

export const parseMd: ParseMd = (path: string) => {
  const content = readFile(path)
  const parts = content.split(separator)
  return {
    ...parse(parts[0]),
    body: md.render(parts[1]),
  }
}
