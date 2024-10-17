const fs = require("fs");
const path = require("path");

const { version } = require("../package.json");

const documentationDir = path.join(__dirname, "../documentation");
const archivedDir = path.join(documentationDir, "archived");
const buildDir = path.join(__dirname, "../build");
const currentFileName = path.join(documentationDir, "documentation.md");
const newFileName = path.join(documentationDir, "documentation-latest.md");
const archivedFileName = path.join(archivedDir, `documentation-${version}.md`);
const buildFileName = path.join(buildDir, "documentation.md");

if (!fs.existsSync(documentationDir)) {
	fs.mkdirSync(documentationDir);
}

if (!fs.existsSync(archivedDir)) {
	fs.mkdirSync(archivedDir);
}

if (fs.existsSync(currentFileName) && fs.existsSync(newFileName)) {
	if (fs.existsSync(archivedFileName)) {
		process.exit(1);
	}

	fs.copyFileSync(currentFileName, archivedFileName);

	const newDocumentationContent = fs.readFileSync(newFileName, "utf-8");
	fs.writeFileSync(currentFileName, newDocumentationContent);

	fs.writeFileSync(newFileName, "");

	if (fs.existsSync(buildDir)) {
		fs.copyFileSync(currentFileName, buildFileName);
	} else {
		process.exit(1);
	}
} else {
	process.exit(1);
}
