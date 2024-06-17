const AppError = require("./appError");

class NotFoundError extends AppError {
  constructor(resource) {
    // properties is going to be an array

    super(`Not able to find properties for the resource ${resource}`, 404);
  }
}

module.exports = NotFoundError;
