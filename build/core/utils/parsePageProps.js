import { criticalError } from './console.js';
export const parsePageProps = (p) => {
    if (!p)
        return null;
    const param = p.split(':');
    if (!param[0] || !param[0].match(/^\//)) {
        criticalError(`<path> must start with / not ${param[0]}`);
    }
    if (param[1]) {
        param[1].split(',').forEach((lang) => {
            if (!lang.match(/^[a-z]{2}$/)) {
                criticalError(`Lang must contain 2 alphabetic letters [a-z] not ${lang}`);
            }
        });
    }
    return {
        pathBase: param[0],
        langs: param[1] ? param[1].split(',') : [],
    };
};
