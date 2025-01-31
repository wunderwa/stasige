import gulp from 'gulp'
import sass from 'gulp-dart-sass'
import autoprefixer from 'gulp-autoprefixer'
import rename from 'gulp-rename'
import { info } from './utils/index.js'

type StylesProps = {
  timekey: string
  stylePath: string
  distDir: string
}

export const taskStyle = ({ timekey, stylePath, distDir }: StylesProps) => {
  info('t', 'Task: STYLES')

  gulp
    .src(stylePath)
    .pipe(
      sass({
        includePaths: ['node_modules'],
        silenceDeprecations: ['legacy-js-api', 'import'],
        quietDeps: true,
        verbose: false,
      }).on('error', sass.logError),
    )
    .pipe(autoprefixer())
    .pipe(rename(`index.${timekey}.css`))
    .pipe(gulp.dest(distDir))
}
