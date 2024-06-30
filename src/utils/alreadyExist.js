const AppError = require("./appError");

class alreadyExist extends AppError {
  constructor(resource) {
   

    super(` ${resource} already exist`, 404);
  }
}

module.exports = alreadyExist;
