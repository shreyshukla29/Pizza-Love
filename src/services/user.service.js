const UserRepository = require("../Repository/user.repository");
const {createCart}=require('../Repository/cart.repository')
class UserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  async registerUser(userDetails) {
    // it will create new user in database
    // 1. need to check if user with email and mobile no already

    const user = await this.UserRepository.findUser({
      email: userDetails.email,
      mobileNumber: userDetails.mobileNumber,
    });

    if (user) {
      throw {
        reason: "User with given email and mobile number already exist",
        statusCode: 400,
      };
    }
    
    const newUser = await this.UserRepository.createUser({
      email: userDetails.email,
      password: userDetails.password,
      firstname: userDetails.firstname,
      lastname: userDetails.lastname,
      mobileNumber: userDetails.mobileNumber,
    });

    if (!newUser) {
      throw { reason: "something went wrong", statusCode: 500 };
    }

    await createCart(newUser._id);

    // 2, if not then we create the user
    // 3 . return the details of created user

    return newUser;
  }
}

module.exports = UserService;
