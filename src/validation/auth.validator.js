const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/serverConfig");
async function isLoggedIn(req, res, next) {
  const token = req.cookies["authToken"];
  if (!token)
    res.status(401).json({
      success: false,
      data: {},
      error: "Not authenticated",
      message: "No auth token provided",
    });

  const decode = jwt.verify(token, JWT_SECRET);

  if (!decode)
    res.status(401).json({
      success: false,
      data: {},
      error: "Not authenticated",
      message: "Invalid token",
    });

  // if decode the user is authencticated
  req.user = {
    email: decode.email,
    id: decode.id,
  };
  next();
}
module.exports = {
  isLoggedIn,
};
