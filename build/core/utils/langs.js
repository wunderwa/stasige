const getItem = (it, lang) => ({
    url: it.path,
    title: it.lang,
    lang: it.lang,
    disabled: it.lang === lang,
});
export const getPageLangs = (langs, lang, dirs) => langs.reduce((acc, _lang) => dirs[_lang] ? [...acc, getItem(dirs[_lang], lang)] : acc, []);
