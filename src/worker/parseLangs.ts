export const parseLangs = (langParam: string, langs: string[]) =>
  langParam
    ? langParam.split(',').map((lng) => {
        const lang = lng.toLowerCase()
        if (langs.includes(lang)) {
          return lang
        } else {
          console.log(
            `\nNo '${lang}' language found in project. Only '${langs.join("', '")}' \n`,
          )
          process.exit(1)
        }
      })
    : langs
