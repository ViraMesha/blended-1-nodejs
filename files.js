// ініціалізація модуля FileSystem з промісами
const fs = require("fs/promises");
const path = require("path");
const dataValidate = require("./helpers/dataValidation");
const checkExtension = require("./helpers/checkExtension");

const createFile = async (req, res) => {
  const { fileName, content } = req.body;
  const { error } = dataValidate(req.body);
  if (error) {
    res.status(400).json({
      message: `Please specify ${error.details[0].context.key} parameter!`,
    });
    return;
  }
  const { extension, hasExtension } = checkExtension(fileName);
  if (!hasExtension) {
    res.status(400).json({
      message: `Sorry, the application doesn't support files with ${extension} extension!`,
    });
    return;
  }
  const filePath = path.join(__dirname, "/files", fileName);

  try {
    await fs.writeFile(filePath, content, "utf-8");
    return res.status(201).json({ message: "File crated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getFiles = async (req, res) => {
  try {
    const dirPath = path.join(__dirname, "/files");
    const result = await fs.readdir(dirPath);
    if (!result.length) {
      return res
        .status(404)
        .json({ message: "Sorry, no files in the directory🤷‍♂️" });
    }
    return res.status(200).json({ message: "Success", files: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const findFile = async (req, res) => {
  try {
    const { fileName } = req.params;
    const dirPath = path.join(__dirname, "/files");

    const result = await fs.readdir(dirPath);

    if (!result.includes(fileName)) {
      res.status(404).json({ message: "No such file in this directory" });
      return;
    }

    const filePath = path.join(__dirname, "/files", fileName);
    const content = await fs.readFile(filePath, "utf-8");
    const stats = await fs.stat(filePath);

    return res.json({
      name: path.basename(fileName, path.extname(fileName)),
      extension: path.extname(fileName),
      content,
      size: stats.size,
      uploadDate: stats.mtime,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createFile, getFiles, findFile };
