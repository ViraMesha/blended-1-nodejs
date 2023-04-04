const Joi = require("joi");

function dataValidate(data) {
  const schema = Joi.object({
    fileName: Joi.string().required(),
    content: Joi.string().required(),
  });
  // на schema викликаємо метод validate, передаємо туди data і з функції повернути результат валідації
  return schema.validate(data);
}

module.exports = dataValidate;
