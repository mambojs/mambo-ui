const fs = require("fs");
const { exec } = require("child_process");
const esbuild = require("esbuild");
const esconfig = require("./esconfig.cjs");
const config = require("./config.cjs");

function buildLib() {
	const libVersion = esconfig.LIB_VERSION;
	console.log("Building library...");

	const headerFn = `function mamboUI(domJS) {
	if (!domJS) {
		throw 'mamboUI must be invoked with required argument domJS: mamboUI(domJS)';
	}
	const ui = { class: {}, d: domJS() };`;

	const footerFn = "\nreturn ui;\n}";

	// Bundle Native
	const optionsBundle = {
		stdin: { contents: "" },
		banner: { js: esconfig.COPYRIGHT + headerFn },
		footer: { js: footerFn },
		inject: getLibFiles(),
		entryNames: esconfig.LIB_FILE_NAME,
		outdir: `${esconfig.LIB_DIR}/${libVersion}`,
	};
	// Minified bundle with sourcemap
	const optionsMinifyMap = {
		...optionsBundle,
		banner: { js: esconfig.COPYRIGHT + headerFn.replace(/\r?\n|\r/g, "") },
		footer: { js: footerFn.replace(/\r?\n|\r/g, "") },
		entryNames: esconfig.LIB_FILE_NAME_MIN,
		outdir: `${esconfig.LIB_DIR}/${libVersion}`,
		minify: true,
		sourcemap: true,
	};

	const optionsCssThemes = {
		entryPoints: ["src/themes/dark.css"],
		outdir: `${esconfig.LIB_DIR}/themes`,
		minify: true,
		bundle: true,
		sourcemap: true,
	};

	esbuild.build(optionsBundle).then(() => {
		console.log("Bundle Lib: Build complete!");
		compileCssLib("bundle", libVersion);
	});

	esbuild.build(optionsMinifyMap).then(() => {
		console.log("Lib Minify mapped: Build complete!");
		compileCssLib("min", libVersion);
	});

	// Disable this optional Theme for now
	/* esbuild.build(optionsCssThemes).then(() => {
		console.log("Css Themes: Build complete!");
	}); */
}

function compileCssLib(lib, version) {
	console.log(`Compiling ${lib} CSS...`);

	exec(`gulp -f ./setup/gulpfile.js cssLibFiles --build ${lib} --mversion ${version}`, (err, stdout, stderr) => {
		if (err) {
			console.log(`error: ${err.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	});
}

function getLibFiles() {
	const arrFiles = [
		`${config.PUBLIC_DIR}/ui/tools/DateManager.js`,
		`${config.PUBLIC_DIR}/ui/tools/String.js`,
		`${config.PUBLIC_DIR}/ui/tools/Tags.js`,
		`${config.PUBLIC_DIR}/ui/tools/Theme.js`,
		`${config.PUBLIC_DIR}/ui/tools/Utilities.js`,
	];

	const files = fs.readdirSync(`${esconfig.SRC_UI}`);

	files.forEach((file) => {
		let component = `${esconfig.SRC_UI}/${file}`;
		let componentName = file;
		if (fs.lstatSync(component).isDirectory() && !file.startsWith("_")) {
			let componentFiles = fs.readdirSync(component);
			componentFiles.forEach((filejs) => {
				if (filejs.endsWith(".js")) {
					const filepath = `${esconfig.SRC_UI}/${componentName}/${filejs}`;
					arrFiles.push(filepath);
				}
			});
		}
	});
	console.log(arrFiles);
	return arrFiles;
}

for (var i = 0; i < process.argv.length; i++) {
	switch (process.argv[i]) {
		case "buildLib":
			buildLib();
			break;
	}
}

module.exports.buildLib = buildLib;
