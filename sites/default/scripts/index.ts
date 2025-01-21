import { Dropdown } from 'bootstrap'
import { fr } from './n.ts'

const  selectors = '.dropdown'

function sor(s){
  return 'dropdown' + s + fr()
}

  Array.from(document.querySelectorAll(selectors)).forEach(
    (toastNode) => new Dropdown(toastNode),
  )



console.log('Start stamdic!', sor('ss'))


