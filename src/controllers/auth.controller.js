const { login } = require("../services/auth.service");

async function authcontroller(req, res) {
  const loginPayload = req.body;

  // auth service

  try {
    const response = await login(loginPayload);

    return res
      .status(200)
      .json({ message: "login successfully", data: response, error: {} });
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
}

module.exports = { authcontroller };
