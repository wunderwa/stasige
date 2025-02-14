import { Modal } from 'bootstrap'

export const initModal = (
  selector: string,
): { modal: Modal; node: Element } | null => {
  const node = document.querySelector(selector)
  return node ? { modal: new Modal(node), node } : null
}
