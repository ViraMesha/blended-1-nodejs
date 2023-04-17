const express = require("express");
const logger = require("morgan");
const router = require("./router");
const app = express();

//Підключаємо парсер JSON
app.use(express.json());

app.use(logger("dev"));
//слухає з'єднання на порті 3000
app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

//підключаємо модуль router.js маршрутизації у додаток:
app.use("/api/files", router);
