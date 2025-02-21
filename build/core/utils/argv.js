import minimist from 'minimist';
import { clean, printHelp } from './index.js';
const minOpts = {
    boolean: ['c', 'h'],
    number: [],
    alias: { c: 'clear', h: 'help' },
};
export const getArgv = (prm) => {
    const { boolean = [], alias = {} } = prm ?? {};
    const opts = {
        boolean: [...boolean, ...minOpts.boolean],
        alias: { ...alias, ...minOpts.alias },
    };
    return minimist(process.argv.slice(2), opts);
};
export const minActions = (cmd, { clear = false, help = true }) => {
    if (clear) {
        clean();
    }
    if (help) {
        printHelp(cmd, { exit: true });
    }
};
export const checkSiteName = (cmd, siteName) => {
    if (!siteName) {
        printHelp(cmd, {
            error: 'No site name found. See help below',
            exit: true,
        });
    }
};
