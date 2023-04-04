const argv = require("yargs").argv;
const { createFile, getFiles, findFile } = require("./files");

// TODO: рефакторить
async function invokeAction({ action, fileName, content }) {
  switch (action) {
    case "create":
      await createFile(fileName, content);
      break;

    case "get":
      await getFiles();
      break;

    case "find":
      await findFile(fileName);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
