import {dirname} from 'node:path'
import { rollup, RollupBuild } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { tsConfig } from './tsConfig.js'

type TaskScriptProps = {
  timekey: string
  scriptPath: string
  distDir: string
}

export const taskScript = async ({
  timekey,
  scriptPath,
  distDir,
}: TaskScriptProps) => {

  const bundle: RollupBuild = await rollup({
    input: scriptPath,
    output: {
      dir: distDir,
      format: 'cjs',
      // format: 'amd',
    },
    plugins: [
      nodeResolve(),
      typescript(tsConfig(distDir, dirname(scriptPath))),
      commonjs({
        include: ["node_modules/**"],
        extensions: ['.js', '.ts']
      }), // need or no?
      terser(),
    ],
  })
  return bundle.write({
    file: `${distDir}/index.${timekey}.js/`,
    format: 'umd',
    name: 'library',
    sourcemap: true,
  })
}
