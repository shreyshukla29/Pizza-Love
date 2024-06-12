const { login } = require("../services/auth.service");

async function authcontroller(req, res) {
  const loginPayload = req.body;

  // auth service

  try {
    const response = await login(loginPayload);

    res.cookie("authToken", response, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ message: "login successfully", data: {}, error: {} });
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
}

module.exports = { authcontroller };
