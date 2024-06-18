const AppError = require("./appError");

class unauthorisedError extends AppError {
  constructor(resource) {
    // properties is going to be an array

    super(`User is not authorised`, 401);
  }
}

module.exports = unauthorisedError;
