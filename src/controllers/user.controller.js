const UserService = require("../services/user.service");
const UserRepository = require("../Repository/user.repository");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");
async function createUser(req, res) {
  const userService = new UserService(new UserRepository());

  try {
    const response = await userService.registerUser(req.body);

    console.log("response", response);

    return res
      .status(201)
      .json({
        message: "  successfully registered user",
        success: true,
        data: response,
        error: {},
      });
  } catch (error) {

  
    if (
      error instanceof AppError ||
      error instanceof mongoose.Error.CastError
    ) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: {},
        error: error,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      error: error,
    });
  }
}

module.exports = { createUser };
