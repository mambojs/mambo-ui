
import pkg from 'gulp';
const { src, dest } = pkg;
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import config from './config.cjs';

function cssLibFiles() {
    return src(['../src/ui/**/*.css','!../src/ui/**/demo/*.css'])
        .pipe(concat(`${config.LIB_FILE_CSS}`))
        .pipe(cleanCSS())
        .pipe(dest(`../${config.LIB_DIR}/${config.LIB_VERSION}`))
}

function cssLibFilesMap() {
    return src(['../src/ui/**/*.css','!../src/ui/**/demo/*.css'])
        .pipe(sourcemaps.init())
        .pipe(concat(`${config.LIB_FILE_CSS}`))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(`../${config.LIB_DIR}/${config.LIB_VERSION}/${config.LIB_MAP}`))
}

export { cssLibFiles, cssLibFilesMap };