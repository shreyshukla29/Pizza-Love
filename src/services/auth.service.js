const UserRepository = require("../Repository/user.repository");
const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRY } = require("../../config/serverConfig");
const jwt = require("jsonwebtoken");
const NotFoundError = require("../utils/notFoundError");

const BadRequestError = require("../utils/BadRequest");
const AppError = require("../utils/appError");
const internalServerError = require("../utils/notFoundError");
async function loginUser(authDetails) {
  try {
    const email = authDetails.email;
    const plainPassword = authDetails.password;

    const userRepository = new UserRepository();

    const user = await userRepository.findUser({ email });
    console.log(user);
    if (!user) {
      throw new NotFoundError("User ");
    }

    const isPasswordValidate = await bcrypt.compare(
      plainPassword,
      user.password
    );

    if (!isPasswordValidate) {
      throw new AppError("Invalid Password", 404);
    }

    const Userrole = user.role ? user.role : "USER";
    const token = await jwt.sign(
      { email: user.email, id: user.id, role: Userrole },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRY,
      }
    );
    return {
      token,
      userRole: user.role,
      userDetail: {
        email: user.email,
        firstname: user.firstname,
      },
    };
  } catch (error) {
    throw error;
  }
}

async function refereshtoken(payload) {
  const user = payload;

  try {
    const token = await jwt.sign(
      { email: user.email, id: user.id, role: user.role },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRY,
      }
    );
    return {
      token,
      userRole: user.role,
      userDetail: {
        email: user.email,
        firstname: user.firstname,
      },
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  loginUser,
  refereshtoken,
};
