import pkg from "gulp";

const { src, dest } = pkg;
import cleanCSS from "gulp-clean-css";
import stripCssComments from "gulp-strip-css-comments";
import headerComment from "gulp-header-comment";
import concat from "gulp-concat";
import sourcemaps from "gulp-sourcemaps";
import config from "./esconfig.cjs";
import empty from "gulp-empty";
import ignore from "gulp-ignore";

function cssLibFiles() {
	const type = process.argv.slice(-3)[0];
	const version = process.argv.slice(-1)[0];

	let libName = config.LIB_FILE_CSS;
	let cleanCss = cleanCSS();
	let mapInit = sourcemaps.init();
	let mapWrite = sourcemaps.write(".");

	// Check config.COPYRIGHT and remove lines with /* * */
	let copyright = config.COPYRIGHT.replace(/.+\*\/|\/\*+|\*/gm, "");

	switch (type) {
		case "bundle":
			mapInit = empty();
			mapWrite = empty();
			cleanCss = empty();
			break;
		case "min":
			libName = config.LIB_FILE_CSS_MIN;
			break;
	}

	return src(["../src/ui/**/*.css"])
		.pipe(ignore.exclude("**/demo/**"))
		.pipe(ignore.exclude("**/*-Orange.css"))
		.pipe(ignore.exclude("**/*-Purple.css"))
		.pipe(ignore.exclude("**/themes/m-orange.css"))
		.pipe(ignore.exclude("**/themes/m-purple.css"))
		.pipe(mapInit)
		.pipe(concat(`${libName}`))
		.pipe(stripCssComments())
		.pipe(cleanCss)
		.pipe(headerComment(copyright))
		.pipe(mapWrite)
		.pipe(dest(`../${config.LIB_DIR}/${version}`));
}

function cssOrangeLibFiles() {
	const type = process.argv.slice(-3)[0];
	const version = process.argv.slice(-1)[0];

	let libName = config.LIB_FILE_CSS.replace(".css", "-orange.css");
	let cleanCss = cleanCSS();
	let mapInit = sourcemaps.init();
	let mapWrite = sourcemaps.write(".");

	// Check config.COPYRIGHT and remove lines with /* * */
	let copyright = config.COPYRIGHT.replace(/.+\*\/|\/\*+|\*/gm, "");

	switch (type) {
		case "bundle":
			mapInit = empty();
			mapWrite = empty();
			cleanCss = empty();
			break;
		case "min":
			libName = config.LIB_FILE_CSS_MIN.replace(".css", "-orange.css");
			break;
	}

	return src("../src/ui/**/*.css")
		.pipe(ignore.exclude("**/demo/**"))
		.pipe(ignore.exclude("**/*-Purple.css"))
		.pipe(ignore.include("**/themes/m-orange.css"))
		.pipe(ignore.include("**/*-Orange.css"))
		.pipe(mapInit)
		.pipe(concat(`${libName}`))
		.pipe(stripCssComments())
		.pipe(cleanCss)
		.pipe(headerComment(copyright))
		.pipe(mapWrite)
		.pipe(dest(`../${config.LIB_DIR}/${version}`));
}

function cssPurpleLibFiles() {
	const type = process.argv.slice(-3)[0];
	const version = process.argv.slice(-1)[0];

	let libName = config.LIB_FILE_CSS.replace(".css", "-purple.css");
	let cleanCss = cleanCSS();
	let mapInit = sourcemaps.init();
	let mapWrite = sourcemaps.write(".");

	// Check config.COPYRIGHT and remove lines with /* * */
	let copyright = config.COPYRIGHT.replace(/.+\*\/|\/\*+|\*/gm, "");

	switch (type) {
		case "bundle":
			mapInit = empty();
			mapWrite = empty();
			cleanCss = empty();
			break;
		case "min":
			libName = config.LIB_FILE_CSS_MIN.replace(".css", "-purple.css");
			break;
	}

	return src("../src/ui/**/*.css")
		.pipe(ignore.exclude("**/demo/**"))
		.pipe(ignore.exclude("**/*-Orange.css"))
		.pipe(ignore.include("**/themes/m-purple.css"))
		.pipe(ignore.include("**/*-Purple.css"))
		.pipe(mapInit)
		.pipe(concat(`${libName}`))
		.pipe(stripCssComments())
		.pipe(cleanCss)
		.pipe(headerComment(copyright))
		.pipe(mapWrite)
		.pipe(dest(`../${config.LIB_DIR}/${version}`));
}

export { cssLibFiles, cssOrangeLibFiles, cssPurpleLibFiles };
