const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/serverConfig");
const unauthorisedError = require("../utils/unauthorisedError");

async function isLoggedIn(req, res, next) {
  const token = req.cookies["authToken"];
  console.log('is logged in')
  if (!token){
    console.log('no token provided')
    return  res.status(401).json({
       success: false,
       data: {},
       error: "Not authenticated",
       message: "No auth token provided",
     });

  }
   

  try {
    const decode = jwt.verify(token, JWT_SECRET);

    if (!decode) {
      throw new unauthorisedError();
    }

    console.log('user is verified')

    // if decode the user is authencticated
    req.user = {
      email: decode.email,
      id: decode.id,
      role: decode.role,
    };
    next();
  } catch (error) {
    console.log('user not verified')
    return res.status(401).json({
      success: false,
      data: {},
      error: error,
      message: "Invalid token provided",
    });
  }
}

async function checkInvalidToken(req, res, next) {

 
  const token = req.cookies["authToken"];
  console.log('checking token validation') 
  try {
    // Verify the token using the secret key
    await jwt.verify(token, JWT_SECRET);
    return res.status(201).json({
      message: "valid token",
      data: {},
      error: {},
      isValid: true,
    });
  } catch (err) {
    // Handle different types of errors
    if (err.name === "TokenExpiredError") {

      console.log('token expired')
      const decode = jwt.decode(token);

      req.user = {
        email: decode.email,
        id: decode.id,
        role: decode.role,
      };
      next();
    } else {
      return res
        .json({ isValid: false, message: "Invalid", verfiy: false })
        .status(500);
    }
  }
}
// this function check if authenticate user is admin or not

function isAdmin(req, res, next) {
  const LoggedInUser = req.user;
  if (LoggedInUser.role === "ADMIN") {
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
  checkInvalidToken,
};
