import fs from "fs";
import argv from "minimist";

const FORMATS = ["ts", "tsx", "js", "jsx"];
const folder = argv(process.argv.slice(2));
const folderName = folder.name[1];

fs.readdir(`./src/${folderName}`, (err, files) => {
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
    .filter(
      (fileData) =>
        FORMATS.includes(fileData.format) && fileData.name !== "index"
    )
    .map(
      (fileData) =>
        `export { default as ${fileData.name} } from './${fileData.name}';`
    )
    .join("\n");

  fs.writeFileSync(`./src/${folderName}/index.${ext}`, fileContent);
});
