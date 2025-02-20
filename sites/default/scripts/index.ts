import { clicker, initMenu, initModal } from './utils/index.js'

document.addEventListener('DOMContentLoaded', () => {
  console.info('Start stasige!')
  initMenu('.dropdown')
  const modal = initModal('#main-modal-center')

  clicker('open-in-modal', function (this: HTMLElement) {
    const body: Element | null = modal?.node.querySelector('.modal-body') ?? null
    if (!body) {
      return
    }
    const elem = this
    const img: HTMLImageElement | null =
      elem.tagName === 'IMG'
        ? (elem as HTMLImageElement)
        : elem.querySelector('img')
    if (img?.src) {
      body.innerHTML = `<img alt="" class="modal-img" src="${img.src}" >`
    } else {
      body.innerHTML = elem.innerHTML
    }
    modal?.modal.show()
  })
})
