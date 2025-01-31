import colorJson from 'color-json'
export type InfoFormat = 't'| 'n' | 'j'

export const info = (
  format: InfoFormat,
  ...data: (string | Object)[]
): void => {
  data.forEach((item) => {
    if (format === 't') {
      // title
      console.info('\n', `\x1b[7m ${item.toString()} \x1b[0m`, '\n')
    } else if (format === 'n') {
      // variable name
      console.info('\n', `\x1b[7m\x1b[32m ${item.toString()} \x1b[0m`, '\n')
    } else if (format === 'j') {
      // colored json
      console.info(colorJson(item))
    }
  })
}
