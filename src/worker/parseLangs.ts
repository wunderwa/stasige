import { criticalError } from '../core/utils/index.js'

export const parseLangs = (langs: string[], langParam?: string) =>
  !langParam
    ? langs
    : langParam.split(',').map((lng) => {
        const lang = lng.toLowerCase()
        if (langs.includes(lang)) {
          return lang
        } else {
          criticalError(
            `\nNo '${lang}' language found in project. Only '${langs.join("', '")}' \n`,
          )
          return ''
        }
      })
