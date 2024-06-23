const { loginUser } = require("../services/auth.service");

async function login(req, res) {
  const loginPayload = req.body;

  // auth service

  try {
    const response = await loginUser(loginPayload);

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

async function logout(req, res) {
  res.cookie("authToken", "", {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    success: true,
    message: "Log out successfull",
    error: {},
    data: {},
  });
}
module.exports = { login, logout };
