const UserService = require("../services/user.service");
const UserRepository = require("../Repository/user.repository");

async function createUser(req, res) {
  const userService = new UserService(new UserRepository());

  try {
    const reponse = await userService.registerUser(req.body);
    return res.status(201).json({ message: "  successfully registered user" });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.reason,
      success: false,
    });
  }
}

module.exports = { createUser };
