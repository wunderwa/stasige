import gulp from 'gulp'
import sass from 'gulp-dart-sass'
import autoprefixer from 'gulp-autoprefixer'
import rename from 'gulp-rename'

type StylesProps = {
  timekey: string
  stylePath: string
  distPath: string
}

export const taskStyle = ({ timekey, stylePath, distPath }: StylesProps) => {
  gulp
    .src(stylePath)
    .pipe(
      sass({
        includePaths: ['node_modules'],
        silenceDeprecations: ['legacy-js-api'],
      }).on('error', sass.logError),
    )
    .pipe(autoprefixer())
    .pipe(rename(`index.${timekey}.css`))
    .pipe(gulp.dest(distPath))
}
