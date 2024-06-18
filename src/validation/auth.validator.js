const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/serverConfig");
const unauthorisedError = require("../utils/unauthorisedError");

async function isLoggedIn(req, res, next) {
  const token = req.cookies["authToken"];
  if (!token)
    res.status(401).json({
      success: false,
      data: {},
      error: "Not authenticated",
      message: "No auth token provided",
    });

  try {
    const decode = jwt.verify(token, JWT_SECRET);

    if (!decode) {
      throw new unauthorisedError();
    }

    // if decode the user is authencticated
    req.user = {
      email: decode.email,
      id: decode.id,
      role: decode.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: {},
      error: error,
      message: "Invalid token provided",
    });
  }
}

// this function check if authenticate user is admin or not

function isAdmin(req, res, next) {
  const LoggedInUser = req.user;


  if (LoggedInUser.role === "ADMIN") {
    console.log("is admin");
    next();
  } else {
    return res.status(401).json({
      success: false,
      data: {},
      message: "You are not authorised for this action",
      error: {
        statusCode: 401,
        reason: "unauthorised for this action",
      },
    });
  }
}
module.exports = {
  isLoggedIn,
  isAdmin,
};
