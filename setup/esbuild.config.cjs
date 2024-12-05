const fs = require("fs");
const path = require("path");
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

	const { arrFiles, arrFilesStories } = getLibFiles();

	// Bundle Native
	const optionsBundle = {
		stdin: { contents: "" },
		banner: { js: esconfig.COPYRIGHT + headerFn },
		footer: { js: footerFn },
		inject: arrFiles,
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

	esbuild.build(optionsBundle).then(() => {
		console.log("Bundle Lib: Build complete!");
		compileCssLib("bundle", libVersion);
	});

	esbuild.build(optionsMinifyMap).then(() => {
		console.log("Lib Minify mapped: Build complete!");
		compileCssLib("min", libVersion);
	});

	const getStoriesContent = (arrFilesStories) => {
		return arrFilesStories
			.map((file) => {
				const content = fs.readFileSync(file, "utf8");

				return content;
			})
			.join("\n");
	};

	const optionsBundleStories = {
		stdin: {
			contents: getStoriesContent(arrFilesStories), // Inyectar el contenido completo de cada archivo
		},
		entryNames: esconfig.STORIES_FILE_NAME,
		outdir: `${esconfig.PUBLIC_DIR}/js`,
	};

	esbuild.build(optionsBundleStories).then(() => {
		console.log("Stories: Build complete!");
		copyFilesToPublic(`${esconfig.LIB_DIR}/${libVersion}`, `${esconfig.LIB_FILE_NAME}.js`, `${esconfig.PUBLIC_DIR}/js`);
		copyFilesToPublic(`${esconfig.LIB_DIR}/${libVersion}`, `${esconfig.LIB_FILE_NAME}.css`, `${esconfig.PUBLIC_DIR}/css`);
		copyFilesToPublic(`${esconfig.LIB_DIR}/${libVersion}`, `${esconfig.LIB_FILE_NAME}-orange.css`, `${esconfig.PUBLIC_DIR}/css`);
	});
}

function copyFilesToPublic(srcDir, fileName, destDir) {
	const srcPath = path.join(srcDir, fileName);
	const destPath = path.join(destDir, fileName);
	fs.copyFileSync(srcPath, destPath);
}

function compileCssLib(lib, version) {
	console.log(`Compiling ${lib} CSS...`);

	exec(`gulp -f ./setup/gulpfile.js cssLibFiles cssOrangeLibFiles --build ${lib} --mversion ${version}`, (err, stdout, stderr) => {
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
		`${config.SRC_DIR}/ui/tools/DateManager.js`,
		`${config.SRC_DIR}/ui/tools/String.js`,
		`${config.SRC_DIR}/ui/tools/Tags.js`,
		`${config.SRC_DIR}/ui/tools/Theme.js`,
		`${config.SRC_DIR}/ui/tools/Utilities.js`,
	];

	const arrFilesStories = [];

	function processDirectory(directory) {
		const files = fs.readdirSync(directory);
		files.forEach((file) => {
			const fullPath = `${directory}/${file}`;

			if (fs.lstatSync(fullPath).isDirectory() && !file.startsWith("_")) {
				if (file === "story") {
					const storyFiles = fs.readdirSync(fullPath).filter((f) => f.endsWith(".js"));
					storyFiles.forEach((storyFile) => {
						arrFilesStories.push(`${fullPath}/${storyFile}`);
					});
				} else {
					processDirectory(fullPath);
				}
			} else if (file.endsWith(".js")) {
				arrFiles.push(fullPath);
			}
		});
	}

	processDirectory(esconfig.SRC_UI);

	console.log("Main Files:", arrFiles);
	console.log("Story Files:", arrFilesStories);

	return { arrFiles, arrFilesStories };
}

for (var i = 0; i < process.argv.length; i++) {
	switch (process.argv[i]) {
		case "buildLib":
			buildLib();
			break;
	}
}

module.exports.buildLib = buildLib;
