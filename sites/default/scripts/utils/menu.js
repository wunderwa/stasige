import { Dropdown } from 'bootstrap';
export const initMenu = (selectors) => {
    Array.from(document.querySelectorAll(selectors)).forEach((node) => new Dropdown(node));
};
