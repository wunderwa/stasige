export const red = (text) => `\x1b[0m \x1b[31m${text}\x1b[0m`;
export const green = (text) => `\x1b[0m \x1b[32m${text}\x1b[0m`;
export const yellow = (text) => `\x1b[0m \x1b[33m${text}\x1b[0m`;
export const alert = (text) => `\x1b[5;37;41m ${text} \x1b[0m`;
export const redLog = (text) => console.log(red(text));
export const greenLog = (text) => console.log(green(text));
export const yellowLog = (text) => console.log(yellow(text));
export const alertLog = (text) => console.log(alert(text));
