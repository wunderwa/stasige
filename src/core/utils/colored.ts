export const red = (text: string | number) => `\x1b[0m \x1b[31m${text}\x1b[0m`
export const green = (text: string | number) => `\x1b[0m \x1b[32m${text}\x1b[0m`
export const yellow = (text: string | number) =>
  `\x1b[0m \x1b[33m${text}\x1b[0m`
export const alert = (text: string) => `\x1b[5;37;41m ${text} \x1b[0m`

export const redLog = (text: string | number) => console.log(red(text))
export const greenLog = (text: string | number) => console.log(green(text))
export const yellowLog = (text: string | number) => console.log(yellow(text))

export const alertLog = (text: string) => console.log(alert(text))
