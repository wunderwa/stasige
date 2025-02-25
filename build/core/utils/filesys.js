import { existsSync, lstatSync, promises, readFileSync, rmSync, unlinkSync, readdirSync, } from 'node:fs';
import { dirname, join } from 'node:path';
import { criticalError } from './console.js';
export const cleanDir = async (filePath) => {
    if (existsSync(filePath)) {
        readdirSync(filePath).forEach((name) => {
            const fPath = join(filePath, name);
            const stat = lstatSync(fPath);
            if (stat.isDirectory()) {
                rmSync(fPath, { recursive: true });
            }
            else {
                unlinkSync(fPath);
            }
        });
    }
};
export const readDir = async (dirPath) => {
    return await promises.readdir(dirPath, { recursive: true });
};
export const readFile = (filePath) => readFileSync(filePath, 'utf8');
export const readConfig = (filePath) => {
    try {
        return JSON.parse(readFile(filePath));
    }
    catch (e) {
        criticalError(`Could not read config file.\n ${filePath}`);
        return null;
    }
};
export const readMono = () => readConfig('package.json')?.mono ?? false;
export const joinPath = (dirs, file) => join(...dirs, file);
export const writeFile = async (filePath, content) => {
    const dirPath = dirname(filePath);
    if (!existsSync(dirPath)) {
        await promises.mkdir(dirPath, { recursive: true });
    }
    await promises.writeFile(filePath, content);
};
