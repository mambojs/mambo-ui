const PORT_DEV = 8002;
const PORT_RELOAD = 8010;
const PORT = process.env.PORT || PORT_DEV;

const LIB_DIR = "build";
const LIB_NAME = "mambo-ui-min";
const LIB_VERSION = `v${dateFormat()}`;
const LIB_FILE_NAME = `${LIB_NAME}-${LIB_VERSION}`;
const LIB_FILE_JS = `${LIB_FILE_NAME}.js`;
const LIB_PATH = `${LIB_DIR}/${LIB_FILE_JS}`;

const OUTPUT_DIR = "demo";
const OUTPUT_JS = `${OUTPUT_DIR}/lib/${LIB_FILE_JS}`;
const OUTPUT_CSS = `${OUTPUT_DIR}/css/${LIB_FILE_NAME}.css`;
const OUTPUT_HTML = `${OUTPUT_DIR}/index.html`;

const SRC_DIR = "src";
const SRC_PATH = `${SRC_DIR}/configs/mamboInitializer.js`;
const SRC_PATH_DEPS = `${SRC_DIR}/configs/mamboInitializer-deps.js`;
const SRC_TOOLS = `${SRC_DIR}/ui`;

module.exports = {
    PORT,
    PORT_DEV,
    PORT_RELOAD,
    
    LIB_DIR,
    LIB_NAME,
    LIB_VERSION,
    LIB_FILE_NAME,
    LIB_FILE_JS,
    LIB_PATH,

    OUTPUT_DIR,
    OUTPUT_JS,
    OUTPUT_CSS,
    OUTPUT_HTML,

    SRC_DIR,
    SRC_PATH,
    SRC_PATH_DEPS,
    SRC_TOOLS
}

function dateFormat () {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth()+1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return [month,day,year,hour,minutes].join('-');
}