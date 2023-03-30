"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const minimist_1 = __importDefault(require("minimist"));
const FORMATS = ["ts", "tsx", "js", "jsx"];
const folder = (0, minimist_1.default)(process.argv.slice(2));
const folderName = folder.name[1];
fs_1.default.readdir(`./src/${folderName}`, (err, files) => {
    if (err) {
        return console.log("Unable to scan directory: " + err);
    }
    let ext = "ts";
    const fileContent = files
        .map(function (file) {
        const [fileName, fileFormat] = file.split(".");
        ext = fileFormat;
        return { name: fileName, format: fileFormat };
    })
        .filter((fileData) => FORMATS.includes(fileData.format) && fileData.name !== "index")
        .map((fileData) => `export { default as ${fileData.name} } from './${fileData.name}';`)
        .join("\n");
    fs_1.default.writeFileSync(`./src/${folderName}/index.${ext}`, fileContent);
});
//# sourceMappingURL=index.js.map