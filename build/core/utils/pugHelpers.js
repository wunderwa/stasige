import { join, parse } from 'node:path';
import { readdirSync } from 'node:fs';
import { distAssetsDir } from './config.js';
import { readFile } from './filesys.js';
export const pugFunc = () => ({
    assets: (p) => join('/', distAssetsDir, p),
});
export const pugData = (pathInData) => {
    const list = readdirSync(pathInData());
    const data = {};
    for (const fl of list) {
        data[parse(fl).name] = JSON.parse(readFile(pathInData(fl)));
    }
    return data;
};
