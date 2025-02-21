import { readFile } from './filesys.js';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
export const helpTextLines = (name) => {
    const fPath = join(process.cwd(), 'src', 'help', `yarn-${name}.txt`);
    if (existsSync(fPath)) {
        const text = readFile(`src/help/yarn-${name}.txt`);
        const list = text.split('\n');
        list[0] = `\x1b[7m > Stasige: ssg \x1b[0m \x1b[1m yarn ${name} \x1b[0m`;
        return list;
    }
    else {
        return [['error', `Wrong help file path: ${fPath} `]];
    }
};
