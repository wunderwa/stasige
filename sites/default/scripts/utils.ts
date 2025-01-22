import { Dropdown } from 'bootstrap'

export const fr = () => {
  return 'fucking rollup';
}

export const initMenu = (selectors: string) => {
  Array.from(document.querySelectorAll(selectors)).forEach(
    (toastNode) => new Dropdown(toastNode),
  )

}
