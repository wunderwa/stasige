import { rollup, RollupBuild } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { tsConfig } from './tsConfig.js'

type TaskScriptProps = {
  timekey: string
  scriptPath: string
  distPath: string
}

export const taskScript = async ({
  timekey,
  scriptPath,
  distPath,
}: TaskScriptProps) => {

  const bundle: RollupBuild = await rollup({
    input: scriptPath,
    output: {
      dir: distPath,
      format: 'cjs',
      // format: 'amd',
    },
    plugins: [
      nodeResolve(),
      typescript(tsConfig(distPath)),
      commonjs({
        include: ["node_modules/**"],
        extensions: ['.js', '.ts']
      }), // need or no?
      terser(),
    ],
  })
  return bundle.write({
    file: `${distPath}/index.${timekey}.js/`,
    format: 'umd',
    name: 'library',
    sourcemap: true,
  })
}
