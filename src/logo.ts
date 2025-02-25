import { readFile, clean } from './core/utils/index.js'

const path = 'docs/img/stasige-art.txt'
const logo = readFile(path)
clean()
console.info(logo)
