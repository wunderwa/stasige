export const clicker = (name: string, callback: () => void) => {
  console.log(document.querySelectorAll(`[data-clicker]`))
  Array.from(document.querySelectorAll(`[data-clicker="${name}"]`)).forEach(
    (node: Element) => node.addEventListener('click', callback),
  )
}
