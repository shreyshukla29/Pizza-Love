const UserRepository = require("../Repository/user.repository");
const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRY } = require("../../config/serverConfig");
const jwt = require("jsonwebtoken");

async function login(authDetails) {
  const email = authDetails.email;
  const plainPassword = authDetails.password;

  // check if there is registered user with this email;
  const userRepository = new UserRepository();

  const user = await userRepository.findUser({ email });

  if (!user) {
    throw { message: "No user found with this email", statusCode: 404 };
  }

  const isPasswordValidate = await bcrypt.compare(plainPassword, user.password);

  if (!isPasswordValidate) {
    throw { message: "invalid password", statusCode: 401 };
  }

  // if password validate create a token and return

  let token;
  
  try {
    const Userrole = user.role ? user.role : "USER";
    console.log(Userrole);
    token = await jwt.sign(
      { email: user.email, id: user.id, role: Userrole },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRY,
      }
    );
  } catch (error) {
    throw { message: "not able to login", statusCode: 401 };
  }

  return token;
}

module.exports = {
  login,
};
