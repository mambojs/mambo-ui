
const fs = require('fs');
const { exec } = require("child_process");
const esbuild = require("esbuild");
const config = require("./config.cjs");

function buildLib() {

  const libVersion = config.LIB_VERSION;

  console.log("Building library...");

  const headerFn = `\nfunction mamboUI() { \nconst ui = { class: {} };\nconst dom = domJS();\n`;
  const footerFn = `\nreturn ui;\n}`;

  // Bundle Native
  const optionsBundle = {
    stdin: { contents: '' },
    banner: { js: config.COPYRIGHT + headerFn },
    footer: { js: footerFn },
    inject: getLibFiles(),
    entryNames: config.LIB_FILE_NAME,
    outdir: `${config.LIB_DIR}/${libVersion}`,
  };
  // Minified bundle with sourcemap
  const optionsMinifyMap = {
    ...optionsBundle,
    banner: { js: config.COPYRIGHT + headerFn.replace(/\r?\n|\r/g, "") },
    footer: { js: footerFn.replace(/\r?\n|\r/g, "") },
    entryNames: config.LIB_FILE_NAME_MIN,
    outdir: `${config.LIB_DIR}/${libVersion}`,
    minify: true,
    sourcemap: true
  };

  const optionsCssThemes = {
    entryPoints: ['src/themes/dark.css'],
    outdir: `${config.LIB_DIR}/themes`,
    minify: true,
    bundle: true,
    sourcemap: true
  };

  esbuild.build(optionsBundle).then(result => {
    console.log("Bundle JS Lib: Build complete!");
    compileCssLib('bundle', libVersion);
  });

  esbuild.build(optionsMinifyMap).then(result => {
    console.log("JS Lib Minify mapped: Build complete!");
    compileCssLib('min', libVersion);
  });
  
  esbuild.build(optionsCssThemes).then(result => {
    console.log("Css Themes: Build complete!");
  });

}

function compileCssLib(lib, version){

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
  })
}

function getLibFiles() {
  const arrFiles = [
    `${config.SRC_DIR}/configs/mamboDefaultTagNames.js`,
    `${config.SRC_DIR}/configs/mamboDefaultTheme.js`,
    `${config.SRC_DIR}/configs/mamboGraphics.js`,
    `${config.SRC_DIR}/configs/MamboDate/MamboDateManager.js`,
    `${config.SRC_DIR}/configs/MamboString/MamboString.js`,
    `${config.SRC_DIR}/configs/MamboUtils/MamboUtilities.js`
  ];
  const files = fs.readdirSync(`${config.SRC_UI}`); 
  files.forEach(file => {
    let component = `${config.SRC_UI}/${file}`;
    let componentName = file;
    if (fs.lstatSync(component).isDirectory() && !file.startsWith('_')) {
      let componentFiles = fs.readdirSync(component);
      componentFiles.forEach(filejs => {
        if (filejs.endsWith(".js")) {
          const filepath = `${config.SRC_UI}/${componentName}/${filejs}`;
          arrFiles.push(filepath);
        }
      });
    }
  });
  console.log(arrFiles);
  return arrFiles;
}

for (var i=0; i<process.argv.length;i++) {
  switch (process.argv[i]) {
    case 'buildLib':
      buildLib();
      break;
  }
}

module.exports.buildLib = buildLib;