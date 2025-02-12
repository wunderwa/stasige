import gulp from 'gulp'
import sass from 'gulp-dart-sass'
import autoprefixer from 'gulp-autoprefixer'
import replace from 'gulp-replace'
import rename from 'gulp-rename'
import { distAssetsDir, info } from './utils/index.js'

type StylesProps = {
  timekey: string
  styleIndexPath: string
  distDir: string
}

export const taskStyle = ({
  timekey,
  styleIndexPath,
  distDir,
}: StylesProps) => {
  info('title', 'Task: STYLES')

  gulp
    .src(styleIndexPath)
    .pipe(
      sass({
        includePaths: ['node_modules'],
        silenceDeprecations: ['legacy-js-api', 'import'],
        quietDeps: true,
        verbose: false,
      }).on('error', sass.logError),
    )
    .pipe(autoprefixer())
    // url("../assets/
    .pipe(replace(/url\("(\.\.\/)+assets\//g, `url("/${distAssetsDir}`))

    .pipe(rename(`index.${timekey}.css`))
    .pipe(gulp.dest(distDir))
}
