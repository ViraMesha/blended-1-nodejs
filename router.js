const express = require("express");
const router = express.Router();

const { createFile, getFiles, findFile } = require("./files");

router.get("/", getFiles);

router.get("/:fileName", findFile);

router.post("/", createFile);

module.exports = router;
