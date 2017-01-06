import * as gulp from 'gulp';
import * as sass from 'gulp-sass';
import * as cssGlobbing from 'gulp-css-globbing';
import { join } from 'path';

gulp.task('build.sass', () => {

  return gulp.src(join('./src/app', '**', '*.scss'))
    .pipe(
      cssGlobbing({
        extensions: ['.scss']
      })
    )
    .pipe(
      sass({
        //includePaths:[join('', 'stylesheets')],
        style: 'compressed'
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest('./www/build'));

});
