import gulp from 'gulp'
import rename from 'gulp-rename'

import webp from 'gulp-webp'

import { info } from './utils/index.js'
import { sep } from 'node:path'


type Props = {
  pathInPages: (page?: string) => string
  distDir: string
}

export const taskImages = ({pathInPages, distDir}: Props) => {
  info('t', 'Task: IMAGES')

  // gif
  const gifList = pathInPages(`**/*.gif`)
    console.log(gifList)
  gulp
    .src(gifList, {encoding: false})
    .pipe(rename(function(file) {
      console.log(file)
      const dir =  file.dirname.split(sep).slice(0, -1)
      file.dirname = ['i', ...dir].join(sep)
    }))
    .pipe(gulp.dest(distDir))

  // png,jpg,webp
  const list = pathInPages(`**/*.{png,jpg,webp}`)
  gulp
    .src(list, {encoding: false})
    .pipe(rename(function(file) {
      console.log('----\n', file)
      if(!['.webp', '.gif'].includes(file.extname)){
        file.basename += file.extname
      }
      console.log(file, '\n\n')
    }))
    .pipe(webp())
    .pipe(rename(function(file) {
      console.log(file)
      const dir =  file.dirname.split(sep).slice(0, -1)
      file.dirname = ['i', ...dir].join(sep)
    }))
    .pipe(gulp.dest(distDir))

}
