import { dirname } from 'node:path';
import { rollup } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { tsConfig } from './tsConfig.js';
import { info } from './utils/index.js';
export const taskScript = async ({ timekey, scriptIndexPath, distDir, }) => {
    info('title', 'Task: SCRIPT');
    const bundle = await rollup({
        input: scriptIndexPath,
        output: {
            dir: distDir,
            format: 'cjs',
            // format: 'amd',
        },
        plugins: [
            // @ ts-expect-error third party
            nodeResolve(),
            // @ ts-expect-error third party
            typescript(tsConfig(distDir, dirname(scriptIndexPath))),
            // @ ts-expect-error see https://github.com/rollup/plugins/issues/1662
            commonjs({
                include: ['node_modules/**'],
                extensions: ['.js', '.ts'],
            }),
            // @ ts-expect-error
            terser(),
        ],
    });
    await bundle.write({
        file: `${distDir}/index.${timekey}.js/`,
        format: 'umd',
        name: 'library',
        sourcemap: false,
    });
};
