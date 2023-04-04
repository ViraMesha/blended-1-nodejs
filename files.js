// ініціалізація модуля FileSystem з промісами
const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dataValidate = require("./helpers/dataValidation");
const checkExtension = require("./helpers/checkExtension");

async function createFile(fileName, content) {
  const data = {
    fileName,
    content,
  };
  const { error } = dataValidate(data);
  if (error) {
    return console.log(
      chalk.red(`Please specify ${error.details[0].context.key} parameter!`)
    );
  }
  const { extension, hasExtension } = checkExtension(fileName);
  if (!hasExtension) {
    return console.log(
      chalk.red(
        `Sorry, the application doesn't support files with ${extension} extension!`
      )
    );
  }
  const filePath = path.join(__dirname, "/files", fileName);
  console.log(filePath);
  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log(chalk.green("File crated successfully"));
  } catch (error) {
    console.log(chalk.red(`${error.content}`));
  }
}

async function getFiles() {
  const dirPath = path.join(__dirname, "/files");
  const result = await fs.readdir(dirPath);
  if (!result.length) {
    return console.log(chalk.red("Sorry, no files in the directory🤷‍♂️"));
  }
  console.log(result);
  return result;
}

async function findFile(fileName) {
  const dirPath = path.join(__dirname, "/files");
  const result = await fs.readdir(dirPath);
  if (!result.includes(fileName)) {
    return console.log(chalk.red("No such file in this directory"));
  }
  const filePath = path.join(__dirname, "/files", fileName);
  const content = await fs.readFile(filePath, "utf-8");
  const stats = await fs.stat(filePath);
  const data = {
    name: path.basename(fileName, path.extname(fileName)),
    extension: path.extname(fileName),
    content,
    size: stats.size,
    uploadDate: stats.mtime,
  };
  return data;
}

module.exports = { createFile, getFiles, findFile };
