export const clicker = (name, callback) => {
    console.log(document.querySelectorAll(`[data-clicker]`));
    Array.from(document.querySelectorAll(`[data-clicker="${name}"]`)).forEach((node) => node.addEventListener('click', callback));
};
