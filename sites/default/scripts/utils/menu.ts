import { Dropdown } from 'bootstrap'

export const initMenu = (selectors: string) => {
  Array.from(document.querySelectorAll(selectors)).forEach(
    (node) => new Dropdown(node),
  )
}
