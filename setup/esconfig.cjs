const { version } = require("../package.json");
const config = require("./config.cjs");
const LIB_DIR = "build";
const LIB_NAME = "mambo-ui";
const LIB_VERSION = version;
const LIB_FILE_NAME = `${LIB_NAME}-${LIB_VERSION}`;
const LIB_FILE_NAME_MIN = `${LIB_NAME}-min-${LIB_VERSION}`;
const LIB_FILE_CSS = `${LIB_FILE_NAME}.css`;
const LIB_FILE_CSS_MIN = `${LIB_FILE_NAME_MIN}.css`;
const SRC_UI = `${config.SRC_DIR}/ui/components`;
const PUBLIC_DIR = config.PUBLIC_DIR;
const STORIES_FILE_NAME = `${LIB_NAME}-${LIB_VERSION}-stories`;
const CURRENT_YEAR = new Date().getFullYear();

const COPYRIGHT = `/******************************************
*  Copyright ${CURRENT_YEAR} Alejandro Sebastian Scotti, Scotti Corp.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License.

*  @author Alejandro Sebastian Scotti
*  @version ${LIB_VERSION}
*******************************************/
`;

module.exports = {
	LIB_DIR,
	LIB_NAME,
	LIB_VERSION,
	LIB_FILE_NAME,
	LIB_FILE_NAME_MIN,
	LIB_FILE_CSS,
	LIB_FILE_CSS_MIN,
	SRC_UI,
	COPYRIGHT,
	STORIES_FILE_NAME,
	PUBLIC_DIR,
};

function dateFormat() {
	const date = new Date();
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear().toString().slice(-2);
	const hour = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");

	return [month, day, year, hour, minutes].join("-");
}
