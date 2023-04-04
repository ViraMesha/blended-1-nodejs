function checkExtension(fileName) {
  const EXTENSIONS = ["js", "json", "txt", "xml", "css", "html"];

  const extension = fileName.slice(fileName.lastIndexOf(".") + 1);
  const hasExtension = EXTENSIONS.includes(extension);
  return { extension, hasExtension };
}

module.exports = checkExtension;
