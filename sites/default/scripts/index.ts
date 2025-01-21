import { Dropdown } from 'bootstrap'
import { fr } from './utils.js'

const  selectors = '.dropdown'

function sor(s: string) {
  return 'dropdown' + s + fr()
}

  Array.from(document.querySelectorAll(selectors)).forEach(
    (toastNode) => new Dropdown(toastNode),
  )



console.log('Start stamdic!', sor('ss'))


