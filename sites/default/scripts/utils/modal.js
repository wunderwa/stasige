import { Modal } from 'bootstrap';
export const initModal = (selector) => {
    const node = document.querySelector(selector);
    return node ? { modal: new Modal(node), node } : null;
};
