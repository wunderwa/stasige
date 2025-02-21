import gulp from 'gulp';
import rename from 'gulp-rename';
// @ts-ignore no declare module found
import webp from 'gulp-webp';
import { distAssetsDir, distImgDir, info } from './utils/index.js';
import { sep } from 'node:path';
const gulpList = (list) => gulp.src(list, { encoding: false });
const convDirName = (dName, root, sli) => {
    const dirs = dName.split(sep).slice(0, sli);
    return [root, ...dirs].join(sep);
};
const renamePath = (root, sli) => (file) => {
    file.dirname = convDirName(file.dirname, root, sli);
};
const updateBaseName = (file) => {
    if (!['.webp', '.gif'].includes(file.extname)) {
        file.basename += file.extname;
    }
};
export const taskImages = ({ pathInAssets, pathInPages, distDir }) => {
    info('title', 'Task: IMAGES');
    // pages: gif, svg
    gulpList(pathInPages('**/*.{svg,gif}'))
        .pipe(rename(renamePath(distImgDir, -1)))
        .pipe(gulp.dest(distDir));
    // pages: png,jpg,webp
    gulpList(pathInPages('**/*.{png,jpg,webp}'))
        .pipe(rename(updateBaseName))
        .pipe(webp())
        .pipe(rename(renamePath(distImgDir, -1)))
        .pipe(gulp.dest(distDir));
    // -----------------------------
    // assets: png,jpg,webp,svg
    const assetsList = pathInAssets(`**/*.{png,jpg,webp,svg,dif}`);
    gulpList(assetsList)
        .pipe(rename(renamePath(distAssetsDir)))
        .pipe(gulp.dest(distDir));
};
