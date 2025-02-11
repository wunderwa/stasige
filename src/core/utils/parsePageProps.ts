import { PageProps } from './types.js'

export const parsePageProps = (p: string): PageProps => {
  if (!p) return null
  const param = p.split(':')

  if (!param[0] || !param[0].match('/,/')) {
    return null
  }

  return {
    pathBase: param[0],
    langs: param[1] ? param[1].split(',') : [],
  }
}
